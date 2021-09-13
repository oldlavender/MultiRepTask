export const ModelType = {
    UNDEFINED: 0x0000,
    RANDOM: 0x0001,
    HYBRID: 0x0002,
    NAMU: 0x0004,
    BONHO: 0x0008,
    WUG: 0x0010,
    TUG: 0x0020,
    ZILNAR: 0x0040,
    OLBAR: 0x0080,
    get AMBIGUOUS(){
        return this.HYBRID;
    },
    get AMBIGUOUS_NAMUBONHO() {
        return this.HYBRID | this.NAMU | this.BONHO;
    },
    get AMBIGUOUS_ZILNAR() {
        return this.AMBIGUOUS | this.ZILNAR;
    },
    get AMBIGUOUS_OLBAR() {
        return this.AMBIGUOUS | this.OLBAR;
    },
    get RANDOM_NAMUBONHO_HYBRIDALLOWED() {
        return this.AMBIGUOUS_NAMUBONHO | this.RANDOM;
    },
    get RANDOM_ZILNAROLBAR_AMBIGUOUSOBJECTALLOWED() {
        return this.AMBIGUOUS | this.ZILNAR | this.OLBAR | this.RANDOM;
    },
    get RANDOM_NAMUBONHO() {
        return this.NAMU | this.BONHO | this.RANDOM;
    },
    get RANDOM_WUGTUG() {
        return this.WUG | this.TUG | this.RANDOM;
    },
    get RANDOM_ZILNAROLBAR() {
        return this.ZILNAR | this.OLBAR | this.RANDOM;
    },
};

export const ModelSpec = {
    Generic: {
        AllowedModelTypes: [],
        ViableModelTypes: [],
        ViableHybridModelTypes: [],
        StartPosition: {
            x: 0,
            y: 0,
        },
    },
    NamuBonho: {
        AllowedModelTypes: [ModelType.NAMU, ModelType.BONHO, ModelType.AMBIGUOUS_NAMUBONHO],
        ViableModelTypes: [ModelType.NAMU, ModelType.BONHO],
        ViableHybridModelTypes: [ModelType.NAMU, ModelType.BONHO, ModelType.AMBIGUOUS_NAMUBONHO],
        RectangleWidth: {
            Namu: {
                min: 35,
                max: 55,
            },
            Bonho: {
                min: 85,
                max: 105,
            },
        },
        EllipseWidth: {
            Namu: {
                min: 65,
                max: 90,
            },
            Bonho: {
                min: 105,
                max: 130,
            }
        },
        Grammar: {
            Namu: {
                singular: 'namu',
                plural: 'namus',
            },
            Bonho: {
                singular: 'bonho',
                plural: 'bonhos'
            },
            Generic: {
                singular: 'objeto',
                plural: 'objetos',
            },
        },
        StartPosition: {
            x: 0,
            y: 0,
        },
    },
    WugTug: {
        AllowedModelTypes: [ModelType.WUG, ModelType.TUG],
        ViableModelTypes: [ModelType.WUG, ModelType.TUG],
        ViableHybridModelTypes: [],
        DefaultColor: {
            red: 0x88,
            green: 0x88,
            blue: 0x88,
        },
        ImageSpec: {
            Wug: {
                filename: './images/wug_template.png',
                width: 129, //original: 216
                height: 120, //original: 201
            },
            Tug: {
                filename: './images/tug_template.png',
                width: 187, //original: 446
                height: 120, //original: 286
            },
        },
        Grammar: {
            Wug: {
                singular: 'wug',
                plural: 'wugs',
            },
            Tug: {
                singular: 'tug',
                plural: 'tugs',
            },
            Generic: {
                singular: 'personagem',
                plural: 'personagens',
            },
        },
        StartPosition: {
            x: 0,
            y: 0,
        },
    },
    ZilnarOlbar: {
        AllowedModelTypes: [
            ModelType.ZILNAR, 
            ModelType.OLBAR, 
            ModelType.AMBIGUOUS_ZILNAR, 
            ModelType.AMBIGUOUS_OLBAR
        ],
        ViableModelTypes: [
            ModelType.ZILNAR, 
            ModelType.OLBAR
        ],
        ViableHybridModelTypes: [
            ModelType.AMBIGUOUS_ZILNAR, 
            ModelType.AMBIGUOUS_OLBAR
        ],
        ArgumentSpec: {
            Zilnar: {
                ViableObjectTypes: [ModelType.NAMU, ModelType.AMBIGUOUS_NAMUBONHO],
                StrictObjectTypes: [ModelType.NAMU],
                ViableAgentTypes: [ModelType.WUG],
                StrictAgentTypes: [ModelType.WUG],
            },
            Olbar: {
                ViableObjectTypes: [ModelType.BONHO, ModelType.AMBIGUOUS_NAMUBONHO],
                StrictObjectTypes: [ModelType.BONHO],
                ViableAgentTypes: [ModelType.TUG],
                StrictAgentTypes: [ModelType.TUG],
            },
        },
        UpdaterSpec: {
            Zilnar: {
                left: {
                    id: 'horizontal-movement',
                    type: 'Linear',
                    duration: 500,
                    start: -218,
                    end: 307,
                },
                top: {
                    id: 'vertical-movement',
                    type: 'Arc',
                    duration: 500,
                    start: 0,
                    end: 0,
                    middle: -150,
                },
            },
            Olbar: {
                left: {
                    id: 'horizontal-movement',
                    type: 'Linear',
                    duration: 500,
                    start: -179,
                    end: 346,
                },
            },
        },
        Grammar: {
            Zilnar: {
                infinitive: 'zilnar',
                participle: 'zilnado',
                past_3rd_sing: 'zilnou',
                gerund: 'zilnando',
            },
            Olbar: {
                infinitive: 'olbar',
                participle: 'olbado',
                past_3rd_sing: 'olbou',
                gerund: 'olbando',
            },
            Generic: {
                infinitive: 'movimentar',
                participle: 'movimentado',
                past_3rd_sing: 'movimentou',
                gerund: 'movimentando',
            },
        },
        SentenceModels: {
            fullActive: 'O ${subject.singular} '.concat(
                '${verb.past_3rd_sing} o ${object.singular}'
            ),
            fullPassive: 'O ${object.singular} '.concat(
                ' foi ${verb.participle} pelo ${subject.singular}'
            ),
        },
        StartPosition: {
            x: -227,
            y: 0,
        },
    },
};

export const datatypes = {
    ModelType: ModelType,
    ModelSpec: ModelSpec,
};

//export default datatypes;