import "./lib/lab.js";
import "./lib/lab.fallback.js";

export const RawScreenObjects = {
    generic: {
        contents: {
            left_button: {
                ellipse: {
                    id: 'left_button_circle',
                    type: 'circle',
                    left: -350,
                    top: 200,
                    width: 65,
                    height: 65,
                    fill: '#12864e',
                    radius: 27.5,
                    startAngle: 0,
                    endAngle: 6.283185307179586,
                },
                text: {
                    id: 'left_button_label',
                    type: 'i-text',
                    top: 200,
                    left: -350,
                    fontSize: 28,
                    text: 'D',
                    fill: '#ffffff',
                    stroke: '#ffffff',
                },
                aoi: {
                    id: 'left',
                    type: 'aoi',
                    left: -350,
                    top: 200,
                    height: 300,
                    width: 300,
                    angle: 0,
                    label: 'left'
                },
            },
            right_button: {
                ellipse: {
                    id: 'right_button_circle',
                    type: 'circle',
                    left: 350,
                    top: 200,
                    width: 65,
                    height: 65,
                    fill: '#12864e',
                    radius: 27.5,
                    startAngle: 0,
                    endAngle: 6.283185307179586,
                },
                text: {
                    id: 'right_button_label',
                    type: 'i-text',
                    top: 200,
                    left: 350,
                    fontSize: 28,
                    text: 'F',
                    fill: '#ffffff',
                    stroke: '#ffffff',
                },
                aoi: {
                    id: 'right',
                    type: 'aoi',
                    left: 350,
                    top: 200,
                    height: 300,
                    width: 300,
                    angle: 0,
                    label: 'right'
                },
            },
        },
        responses: {
            standard_noninput: {
                'keypress(Space)': 'continue',
                'keypress(Enter)': 'continue',
                'keypress(Right)': 'continue',
                'click #continue': 'continue',
                'click #space': 'continue',
            },
        },
    },
    namubonho: {
        contents: {
            answer_labels: {
                namu_buttonlabel: {
                    id: 'namu_buttonlabel', //left
                    type: 'i-text',
                    left: -350,
                    top: 135,
                    fontSize: 20,
                    text: 'namu',
                    fill: '#000000',
                    stroke: '#000000',
                },
                bonho_buttonlabel: {
                    id: 'bonho_buttonlabel', //left
                    type: 'i-text',
                    left: 350,
                    top: 135,
                    fontSize: 20,
                    text: 'bonho',
                    fill: '#000000',
                    stroke: '#000000',
                },
            },
            object: 
            {
                line_template: {
                    id: 'Object',
                    type: 'line',
                    left: 0,
                    top: 0,
                    width: 100,
                    angle: '${ parameters.angle }',
                    strokeWidth: '${ parameters.strokeWidth }',
                    stroke: "rgb(0,0,0)",
                },
            },
        },
        properties: {
            responses: {
                'keypress(d)': 'namu',
                'keypress(f)': 'bonho',
                'click @left': 'namu',
                'click @right': 'bonho',
            },
        },
    },
    fxcross: {
        center: [
            {
                id: 'fxcross_horiz',
                type: 'line',
                left: 0,
                top: 0,
                width: 65,
                strokeWidth: 6,
                angle: 0,
                stroke: "#fcbb0a",
                updaters: {
                    angle: {
                        type: 'Linear',
                        duration: 500,
                        start: 0,
                        end: 630,
                    },
                },
            },
            {
                id: 'fxcross_vert',
                type: 'line',
                left: 0,
                top: 0,
                width: 65,
                strokeWidth: 6,
                angle: 90,
                stroke: "#fcbb0a",
                updaters: {
                    angle: {
                        type: 'Linear',
                        duration: 500,
                        start: 0,
                        end: 630,
                    },
                },
            },
        ],
    },
};

export const ScreenObjects = {
    templates: {
        generic: {
            fxcross: {
                center_canvas: () => new lab.canvas.Screen({
                    title: 'fxcross',
                    datacommit: false,
                    timeout: 500,
                    viewport: [800, 600],
                    content: RawScreenObjects.fxcross.center,
                }),
            },
            pages: {
                html_page: (
                    url, 
                    commit=false, 
                    resp=RawScreenObjects.generic.responses.standard_noninput) => 
                        new lab.html.Screen({
                            contentUrl: url,
                            datacommit: commit,
                            responses: resp,
                            title: url,
                }),
            }
        },
        introduction: {
            welcome: {
                welcome_screen: () => new lab.html.Screen({
                    contentUrl: './ConceptTestPages/welcome.html',
                    datacommit: false,
                    responses: RawScreenObjects.generic.responses.standard_noninput,
                    title: 'welcome.html',
                }),
            },
        },
        namubonho: {
            task_canvas: () => new lab.canvas.Screen({
                title: 'stimulusScreen',
                timeout: 5000,
                viewport: [800, 600],
                responses: RawScreenObjects.namubonho.properties.responses,
                messageHandlers: {
                    /*'before:prepare': function() {
                        this.options.correctResponse = this.aggregateParameters.type;
                    }, //move to the implementation code*/
                },
                content: [
                    RawScreenObjects.namubonho.contents.object.line_template,
                    RawScreenObjects.generic.contents.left_button.aoi,
                    RawScreenObjects.generic.contents.right_button.aoi,
                    RawScreenObjects.generic.contents.left_button.ellipse,
                    RawScreenObjects.generic.contents.right_button.ellipse,
                    RawScreenObjects.generic.contents.left_button.text,
                    RawScreenObjects.generic.contents.right_button.text,
                    RawScreenObjects.namubonho.contents.answer_labels.bonho_buttonlabel,
                    RawScreenObjects.namubonho.contents.answer_labels.namu_buttonlabel,
                ],
            }),
            feedback_screen: () => new lab.html.Screen({
                contentUrl: './ConceptTestPages/feedback.html',
                title: "feedback.html",
                parameters: {
                    bgColor: 'black',
                    fgColor: 'white',
                    fbTitle: 'RESPOSTA INDETERMINADA',
                    fbMessage: '&eacute; indeterminado se a sua resposta est&aacute; correta.',
                    fbAnswered: '',
                    fbExpected: '(Resposta Correta Ocultada)',
                    responseTime: 5,
                },
                datacommit: false,
                tardy: true,
                responses: RawScreenObjects.generic.responses.standard_noninput,
                messageHandlers: {
                    /*'before:prepare': function() {
                        if (this.options.datastore.)
                    }*/
                }, //implement at the experimental code
            }),
        },
    },
};