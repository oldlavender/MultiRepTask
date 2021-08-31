import { cloneDeep } from "lodash";


/**
 * 
 * @class LabCanvasContent
 * 
 * 
 */
export class LabCanvasContent {

    /**
     * 
     * @param cType the object type
     * @param defaults object containing properties and default values
     * @param properties predefined property values
     */
    constructor(cType, defaults={}, properties={}) {
        this.validateString(cType, "cType");
        this.type = cType;
        properties.type = cType;
        this._properties = {};
        this.default = defaults;
        this.mandatory = [
            'id',
            'left',
            'top',
            'type',
        ];
        this.valid = this.mandatory;
        this.locked = [];
        this.fillDefaults();
        this.fillProperties(properties);
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
        for (let i of Object.keys(def)) {
            this.default[i] = def[i];
        }
    }

    fillProperties(values={}) {
        for (let i of values) {
            this.setProp(i, values[i]);
        }
    }

    fillDefaults() {
        this.fillProperties(this.default);
    }

    has(prop) {
        this.validateString(prop, "prop", "has");
        return this._properties.hasOwnProperty(prop);
    }

    setMandatory(prop) {
        this.mandatory.push(prop);
    }

    setValid(prop) {
        if (prop instanceof String) {
            this.valid.push(prop);
        }
        if (prop instanceof Array) {
            this.valid.push(...prop);
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
        if (!(s instanceof String)) {
            throw new Error(`${this.prototype.name}${
                context=="" ? "" : "::".concat(context)
            }(): ${name} must be a string`);
        }
    }
}