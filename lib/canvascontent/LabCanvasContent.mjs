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
        this.reserveProperties(['_mandatory', '_locked', '_explicit'], []);
        this.setMandatory(['id', 'left', 'top', 'type']);
        this.reserveProperties('_equivalence', {});

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
            this._reserved = [...( this?._reserved || []), props];
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

    lockProperty(prop) {
        if (prop instanceof Array) {
            this._locked = [...this._locked, ...prop];
        }
        else if (prop instanceof String || prop.constructor == String) {
            this._locked = [...this._locked, prop];
        }
    }

    IsComplete() {
        for (let prop of this._mandatory) {
            if (this._explicit.find( (val) => prop==val) ) {
                if (this._properties[prop] === undefined) return false;
            }
            else {
                let retr = this._properties[prop] ?? this._default[prop];
                if (retr === undefined) return false;
            }
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

    setMandatory(prop, explicit=false) {
        var expl = explicit ? [...prop] : [];
        if (prop instanceof Array) {
            this._mandatory = [...this._mandatory, ...prop];
            this._explicit = [...this._explicit, ...expl];
        }
        else {
            this._mandatory = [...this._mandatory, prop];
            this._explicit = explicit ? [
                ...this._explicit, prop
            ] : this._explicit;
        }
        this.addProperties(prop);
    }

    addProperty(prop, modes={}) {
        var pd = Object.getOwnPropertyDescriptor(this, prop);
        modes = {enumerable: true, configurable: true, ...modes, ...pd};
        if (this._reserved.find( (val) => prop==val) ) return;
        if (pd == undefined || pd?.configurable !== false) {
            Object.defineProperty(this, prop, {
                get: () => this.getProp(prop),
                set: (value) => this.setProp(prop, value),
                ...modes
            });
            this.setProp(
                prop, this._properties?.[prop]
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

    addEquivalence(equiv, equivalents=[]) {
        if (equiv === null) {
            for (let i of equivalents) {
                let equiv_minus = equivalents.filter(val => val!=i);
                this._equivalence[i] = [
                    ...(this._equivalence?.[i] || []), ...equiv_minus
                ];
            }
        }
        else if (equiv instanceof String || equiv.constructor == String) {
            this._equivalence[equiv] = [
                ...(this._equivalence?.[equiv] || []), ...equivalents
            ];
        }
    }

    setProp(property, value) {
        this.validateString(property, "property", "setProp");
        if (this._locked.find( (val) => val==property ) == property) {
            return;
        }
        this._properties[property] = value;
        if (this._equivalence?.hasOwnProperty(property)) {
            for (let i of this._equivalence[property]) {
                this._properties[i] = value;
            }
        }
        // @TODO: implement mode.readonly
    }

    getProp(property) {
        this.validateString(property, "property", "setProp");
        return this._properties[property] ?? this._default[property];
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
            return this.fromLabCanvasObjectTemplate(lcc);
        }
        else if (lcc.constructor == Object) {
            return this.fromObjectTemplate(lcc);
        }
        else {
            throw new TypeError(
                `[${this.id ?? 'unset-object-id'}]::FromTemplate(`.concat(
                    JSON.stringify(lcc, null, 0), "): Unsupported type ",
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

        for (let i of lcc._reserved) {
            if (!this.hasOwnProperty(i)) {
                this.reserveProperties(i, lcc[i]);
            }
        }
        this.setDefaults(lcc._default);
        this.setMandatory(lcc._mandatory);
        this.lockProperty(lcc._locked);
        this.addProperties([
            ...Object.keys(lcc._default), ...Object.keys(lcc._properties)
        ]);
        this.fillProperties(lcc._properties);
        return this;
    }

    fromObjectTemplate(obj) {
        return this.fromLabCanvasObjectTemplate(new LabCanvasContent(
            obj.type, obj, {...this, ...obj}
        ));
    }
}