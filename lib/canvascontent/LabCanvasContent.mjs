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
        this.reserveProperties('_reserved', ['_reserved']); // must be first
        this.validateString(cType, "cType");
        this.reserveProperties('_type', cType, false);
        this.reserveProperties('_default', defaults);
        this.reserveProperties(['_properties'], {type: cType});
        this.reserveProperties(['_mandatory', '_locked'], []);
        this.setMandatory(['id', 'left', 'top', 'type']);

        this.addProperties([
            ...Object.keys(defaults), ...Object.keys(values)
        ]);
        this.fillProperties(values);
        
    }

    reserveProperties(props, defvalue=undefined, writable=true) {
        if (props instanceof Array) {
            for (let i of props) {
                this.reserveProperties(i, cloneDeep(defvalue), writable);
            }
        }
        else if (props instanceof String || props.constructor == String) {
            if (!(this._reserved || []).find((val)=>val==props)) {
                (this._reserved || []).push(props);
            }
            if (Object.getOwnPropertyDescriptor(
                this, props
            )?.configurable != false) {
                Object.defineProperty(this, props, {
                    configurable: false, enumerable: false, 
                    value: defvalue, writable,
                });
            }
        }
    }

    closeProperty(prop) {
        var pd = Object.getOwnPropertyDescriptor(this, prop);
        if (pd?.configurable) {
            Object.defineProperty(this, prop,{...pd, writable: false});
        }
    }

    IsComplete() {
        for (let i of this._mandatory) {
            if (this._properties[i] === undefined) return false;
        }
        return true;
    }

    GetObject() {
        return cloneDeep(this._properties);
    }

    Clone() {
        return cloneDeep(this);
    }

    setDefaults(def={}) {
        // to be used, i.e., by inheriting classes to customize defaults
        for (let i of Object.keys(def)) {
            this._default[i] = def[i];
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
        return this.hasOwnProperty(prop);
    }

    setMandatory(prop) {
        if (prop instanceof Array) {
            this._mandatory = this._mandatory.concat(prop);
        }
        else {
            this._mandatory.push(prop);
        }
        this.addProperties(prop);
    }

    addProperty(prop, modes={}) {
        modes = {enumerable: true, configurable: true, ...modes};
        var pd = Object.getOwnPropertyDescriptor(
            this, prop
        );
        if (this._reserved.find((val)=>prop==val)) return;
        if (pd === undefined || pd?.configurable !== false) {
            Object.defineProperty(this, prop, {
                get: ()=>this.getProp(prop),
                set: (value)=>this.setProp(prop, value),
                ...modes
            });
            this.setProp(
                prop, this._properties?.[prop] ?? this._default?.[prop]
            );
        }
        else {
            throw new Error("Attempting to reconfigure previously ".concat(
                `set unconfigurable property ${prop} (id=${this?.id})`
            ));
        }
    }

    addProperties(prop, modes={}) {
        if (prop instanceof Array) {
            for (let i of prop) {
                this.addProperty(i, modes);
            }
        }
        else if (prop instanceof String || prop?.constructor == String) {
            this.addProperty(prop, modes);
        }
        else if (prop instanceof Object) {
            for (let i of Object.keys(prop)) {
                this.addProperty(i, {...modes, ...prop[i]});
            }
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

    FromTemplate(lcc) {
        if (lcc instanceof LabCanvasContent) {
            this.fromLabCanvasObjectTemplate(lcc);
        }
        else if (lcc instanceof Object) {
            this.fromObjectTemplate(lcc);
        }
        else {
            throw new TypeError(
                `[${this.id ?? 'unset-object-id'}]::FromTemplate(`.concat(
                    JSON.stringify(lcc, null, ' '), "): Unsupported type ",
                    `${lcc?.constructor.name}(id=${lcc?.id})`
                )
            );
        }
    }

    fromLabCanvasObjectTemplate(lcc) {
        if (!(lcc instanceof LabCanvasContent))
            throw new TypeError(
                `[${this.id ?? 'unset-object-id'}]::`.concat(
                    "fromLabCanvasObjectTemplate(", 
                    JSON.stringify(lcc, null, ' '),
                    "): not an instance of ", this.constructor.name
                )
            );
        if (lcc.type != this.type) {
            throw new TypeError(`[${this.id ?? 'unset-object-id'}]:`.concat(
                `Cannot copy an instance of type ${lcc.type}(id=${lcc.id})`,
                ` into an instance of type ${this.type}(id=${this.id})`
            ));
        }
        
        this._properties = cloneDeep(lcc._properties);
        this._mandatory = cloneDeep(lcc._mandatory);
        this._reserved = cloneDeep(lcc._reserved);
        this._locked = cloneDeep(lcc._locked);
    }

    fromObjectTemplate(obj) {
        this.fromLabCanvasObjectTemplate(new LabCanvasContent(
            obj.type, obj, {...this, ...obj}
        ));
    }
}