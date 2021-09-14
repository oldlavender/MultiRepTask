import { cloneDeep } from "lodash";


/**
 * 
 * @class LabCanvasContent
 * @abstract Abstract class LabCanvasContent
 * @description Interface for lab.js lab.canvas.Screen contents
 * 
 */
export class LabCanvasContent {

    /**
     * 
     * @param cType the object type
     * @param defaults object containing properties and default values
     * @param properties predefined property values
     * @description Constructs a new canvas content object for lab.canvas.Screen
     */
    constructor(cType, defaults={}, values={}) {
        this.validateString(cType, "cType");
        this.type = cType;
        values.type = cType;
        this._properties = {};
        this.default = {};
        this.mandatory = [
            'id',
            'left',
            'top',
            'type',
        ];
        this.reserved = [
            '_properties',
            'default',
            'mandatory',
            'type',
            'locked'
        ];
        this.locked = [];
        this.valid = [];
        this.setDefaults(defaults);
        this.addProperties(this.mandatory);
        this.addProperties(Object.keys(values));
        this.fillProperties(values);
        
    }

    IsComplete() {
        for (let i of this.mandatory) {
            if (this._properties[i] === undefined) return false;
        }
        return true;
    }

    GetObject() {
        return cloneDeep(this._properties);
    }

    setDefaults(def={}) {
        // to be used, i.e., by inheriting classes to customize defaults
        for (let i of Object.keys(def)) {
            this.default[i] = def[i];
            this.addProperty(i); // , {value: def[i]}
            this[i] = def[i];
        }
    }

    fillProperties(values={}) {
        for (let i of Object.keys(values)) {
            this.setProp(i, values[i]);
        }
        return this;
    }

    has(prop) {
        this.validateString(prop, "prop", "has");
        return this._properties.hasOwnProperty(prop);
    }

    setMandatory(prop) {
        if (prop instanceof Array) {
            this.mandatory.concat(prop);
        }
        else {
            this.mandatory.push(prop);
        }
        this.addProperties(prop);
    }

    addProperty(prop, modes={}) {
        modes = {enumerable: true, configurable: true, ...modes};
        if (this._reserved.find((val)=>prop==val)) return;
        Object.defineProperty(this, prop, {
            get: ()=>this.getProp(prop),
            set: (value)=>this.setProp(prop, value),
            ...modes
        });
    }

    addProperties(prop, modes={}) {
        if (prop instanceof Array) {
            for (let i of prop) {
                this.addProperty(i, modes);
            }
        }
        else if (prop instanceof Object) {
            for (let i of Object.keys(prop)) {
                this.addProperty(i, {...modes, ...prop[i]});
            }
        }
        else if (prop instanceof String || prop?.constructor == String) {
            this.addProperty(prop, modes);
        }
        
    }

    setProp(property, value, mode={}) {
        this.validateString(property, "property", "setProp");
        this._properties[property] = value;
        // @TODO: implement mode.readonly
    }

    getProp(property) {
        this.validateString(property, "property", "setProp");
        return this._properties[property];
    }

    validateString(s, name, context=""){
        if (!(s instanceof String || s?.constructor == String)) {
            throw new Error(`${this.id || 'unset-object-id'}${
                context=="" ? "" : "::".concat(context)
            }(): ${name} must be a string and it's a ${
                typeof(s)
            } with ${s} value`);
        }
    }
}