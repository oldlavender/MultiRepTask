import { cloneDeep } from "lodash";


/**
 * 
 * Interface for lab.js lab.canvas.Screen contents
 * 
 */
export class LabCanvasContent {

    /**
     * 
     * Constructs a new canvas content object for lab.canvas.Screen
     * @param {string} cType the object type
     * @param {object} defaults object containing properties and default values
     * @param {object} properties predefined property values
     * 
     */
    constructor(cType, defaults={}, values={}) {
        this.reserveProperties('_reserved', ['_reserved']); // must be first
        this.validateString(cType, "cType");
        this.reserveProperties('_type', cType, false);
        this.reserveProperties('_default', defaults);
        this.reserveProperties(['_properties'], {type: cType});
        this.reserveProperties(['_mandatory', '_locked', '_explicit'], []);
        this.setMandatory(['id', 'left', 'top', 'type']);
        this.reserveProperties(['_equivalence', '_externalink'], {});

        this.addProperties([
            ...Object.keys(defaults), ...Object.keys(values)
        ]);
        this.fillProperties(values);
        
    }

    /**
     * Sets multiple properties at once
     * @param {object} key_values Object containing keys and values to be set.
     * @returns the called object with the specified values set.
     */
    Sets(values) {
        if (values.constructor === Object) {
            return this.fillProperties(values);
        }
        return this;
    }

    /**
     * Sets a property specifying whether it should be propagated to external
     *      links (same as calledobject.property = value) or not.
     * @param {string} property The property name.
     * @param {any} value The property value to be set.
     * @param [propagate=true] Whether property should be passed to other
     *      objects externally linked with the Link() method.
     */
    Set(property, value, propagate=true) {
        this.setProp(property, value, propagate);
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

    /**
     * Links a property of this object to the same property of an external
     *      one. 
     * @param {string} prop Property to be linked
     * @param {LabCanvasContent|LabCanvasContent[]} extcontent The external
     *      content (s) to update the same property when it changes.
     * @param {boolean} [spread=false] If true, spreads the link to the 
     *      content(s) so they are all mutually linked (changes to any will
     *      cause changes to all the others). If false, only changes in the
     *      called content will imply changes on the others.
     * @param {boolean} [sync=false] If true, sync values immediately rather
     *      than next time the property is set.
     */
    LinkProperty(prop, extcontent, spread=false, sync=false) {
        if (extcontent instanceof LabCanvasContent) {
            if (this.has(prop) && extcontent.has(prop)) {
                this._externalink[prop] = [
                    ...(this._externalink[prop] || []),
                    extcontent
                ];
                if (sync) extcontent[prop] = this[prop];
                if (spread) extcontent.LinkProperty(prop, this);
            }
            else {
                var state = {};
                state[this.id] = this.has(prop) ? 'present' : 'absent';
                state[
                    extcontent.id
                ] = extcontent.has(prop) ? 'present' : 'absent';
                throw new Error(`[${this.id}]::LinkProperty(${
                    JSON.stringify(extcontent, null, 0)
                }): Cannot link property not present in both objects.`.concat(
                    `The property is ${state[this.id]} in the present content`,
                    ` and ${state[extcontent.id]} in the target content `, 
                    `'${extcontent.id}'`
                )); // /.*::LinkProperty.*not present in both objects.*/
            }
        }
        else if (extcontent instanceof Array) {
            for (let cont of extcontent) {
                this.LinkProperty(prop, cont, false, sync);
                // ^ spread=false so it doesn't link the other obejcts yet
                /*
                    The problem with spreading here is that links would end up
                    being between the called object and each of the passed
                    extcontents individually. It means setting the property
                    into the called object would affect all the others, but
                    setting it into any of the others would affect only the
                    content where the property was set and the called object.

                    The intention is to link them all together, as my intended
                    use case would be to set, i.e., positioning for multiple
                    objects at once.
                 */
                if (spread) {
                    var linkedcontents = extcontent.filter(
                        (item) => cont != item
                    );
                    linkedcontents.push(this);
                    /*
                        Now linkedcontents has all objects, including the
                        called object, except the one we're calling next
                    */
                    cont.LinkProperty(prop, linkedcontents);
                }

            }
        }
        else { //it MUST be a LabCanvasContent or an inherited class
            throw new TypeError(`[${this.id}]::LinkProperty(`.concat(
                JSON.stringify(extcontent, null, 0), "): Object is not an ", 
                "instance of LabCanvasContent"
            ));
        }
    }

    setProp(property, value, propagate=true) {
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
        if (propagate && this._externalink?.hasOwnProperty(property)) {
            for (let i of this._externalink[property]) {
                i.setProp(property, value, false);
                // ^ propagate=false to avoid looping
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

    FromTemplate(lcc, id=null) {
        if (lcc instanceof LabCanvasContent) {
            return this.fromLabCanvasObjectTemplate(lcc,);
        }
        else if (lcc.constructor == Object) {
            return this.fromObjectTemplate(lcc, id);
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

    fromLabCanvasObjectTemplate(lcc, id=null) {
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

        if (id == null) {
            id = `copy_of_${lcc.id}`;
        }

        for (let i of lcc._reserved) {
            if (!this.hasOwnProperty(i)) {
                this.reserveProperties(i, lcc[i]);
            }
        }
        this.setDefaults(lcc._default);
        this.setMandatory(lcc._mandatory);
        for (let i of Object.keys(lcc._equivalence)) {
            this.addEquivalence(i, lcc._equivalence[i]);
        }
        this.lockProperty(lcc._locked);
        this.addProperties([
            ...Object.keys(lcc._default), ...Object.keys(lcc._properties)
        ]);
        this.fillProperties({...lcc._properties, id});
        return this;
    }

    fromObjectTemplate(obj, id=null) {
        return this.fromLabCanvasObjectTemplate(new LabCanvasContent(
            obj.type, obj, {...this, ...obj}
        ), id);
    }
}