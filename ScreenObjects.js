import "./lib/lab.js";
import "./lib/lab.fallback.js";

export var Revision = {
    ScreenObjects: {
        major: 0,
        minor: 2,
        rev: 57,
        timestamp: '2021-06-08 6:38PM',
    },
};

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
                    //obsolete, old lines replaced by ellipse+rectangle
                    //kept meanwhile for compatibility reasons, will be removed
                    id: 'Object',
                    type: 'line',
                    left: 0,
                    top: 0,
                    width: 100,
                    angle: '${ parameters.angle }',
                    strokeWidth: '${ parameters.strokeWidth }',
                    stroke: "rgb(0,0,0)",
                },
                ellipse_template: {
                    id: 'Object_p1',
                    type: 'ellipse',
                    left: 0,
                    top: 0,
                    width: '${parameters.p1Width}', //changed from fixed 140
                    height: 20,
                    //strokeWidth: 1,
                    stroke: 'rgb(255,255,255)',
                    fill: 'black',
                    angle: 45
                    //angle: '${parameters.p1Angle}', //kept for log purposes 
                },
                ellipse_template2: { //experimental, trying with two ellipses
                    id: 'Object_p2',
                    type: 'ellipse',
                    left: 0,
                    top: 0,
                    width: 140,
                    height: 20,
                    fill: 'black',
                    angle: '${parameters.p2Angle}',
                },
                rectangle_template: {
                    id: 'Object_p2',
                    type: 'rect', //rectangle
                    left: 0,
                    top: 0,
                    width: '${parameters.p2Width}',
                    height: '25',
                    fill: 'black',
                    angle: 45+90,
                    // angle: '${parameters.p1Angle+90}', //kept for log purposes
                    // angle: '${parameters.p2Angle}', //kept for log purposes
                },
            },
        },
        feedback_screen: {
            objects: {
                background:{
                    id: 'background',
                    type: 'rect',
                    left: 0,
                    top: 0,
                    width: "${parameters.screenWidth}",
                    height: "${parameters.screenHeight}",
                    fill: "${parameters.bgColor}",
                },
                title:{
                    id: 'title',
                    type: 'i-text',
                    left: 0,
                    top: "${25+(-parameters.screenHeight/2)}",
                    fontSize: 32,
                    fontWeight: 'bold',
                    text: "${parameters.fbTitle}",
                    fill: "${parameters.fgColor}",
                },
                status_message:{
                    id: 'status_message',
                    type: 'i-text',
                    left: "${35+(-parameters.screenWidth/2)}",
                    top: "${0+65+(-parameters.screenHeight/2)}",
                    fontSize: 20,
                    textAlign: 'left',
                    text: "A sua resposta ${parameters.fbStatusMessage}.",
                    fill: "${parameters.fgColor}",
                },
                hint_message:{
                    id: 'hint_message',
                    type: 'i-text',
                    left: "${35+(-parameters.screenWidth/2)}",
                    top: "${20+65+(-parameters.screenHeight/2)}",
                    fontSize: 20,
                    textAlign: 'left',
                    text: "${parameters.fbHintMessage} nas próximas vezes!",
                    fill: "${parameters.fgColor}",
                },
                response_label: {
                    id: 'response_label',
                    type: 'i-text',
                    left: -2,
                    top: "${-44-30+(parameters.screenHeight/2)}",
                    text: 'Sua Resposta:',
                    fontSize: 22,
                    textAlign: 'right',
                    fill: "${parameters.fgColor}",
                },
                response_value: {
                    id: 'response_value',
                    type: 'i-text',
                    left: 5,
                    top: "${-44-30+(parameters.screenHeight/2)}",
                    text: "${parameters.fbAnswered}",
                    fontSize: 22,
                    textAlign: 'left',
                    fill: "${parameters.fgColor}",
                },
                correctResponse_label: {
                    id: 'correctResponse_label',
                    type: 'i-text',
                    left: -2,
                    top: "${-22-30+(parameters.screenHeight/2)}",
                    text: 'Resposta Esperada:',
                    fontSize: 22,
                    textAlign: 'right',
                    fill: "${parameters.fgColor}",
                },
                correctResponse_value: {
                    id: 'correctResponse_value',
                    type: 'i-text',
                    left: 5,
                    top: "${-22-30+(parameters.screenHeight/2)}",
                    text: "${parameters.fbExpected}",
                    fontSize: 22,
                    textAlign: 'left',
                    fill: "${parameters.fgColor}",
                },
                time_label: {
                    id: 'correctResponse_label',
                    type: 'i-text',
                    left: -2,
                    top: "${-0-30+(parameters.screenHeight/2)}",
                    text: 'Tempo de Resposta:',
                    fontSize: 22,
                    textAlign: 'right',
                    fill: "${parameters.fgColor}",
                },
                time_value: {
                    id: 'correctResponse_value',
                    type: 'i-text',
                    left: 5,
                    top: "${-0-30+(parameters.screenHeight/2)}",
                    text: "${parameters.responseTime} segundos",
                    fontSize: 22,
                    textAlign: 'left',
                    fill: "${parameters.fgColor}",
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
                        start: 90,
                        end: 720,
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
                title: 'stimulusScreen_namubonho',
                timeout: 5000,
                viewport: [800, 600],
                responses: RawScreenObjects.namubonho.properties.responses,
                messageHandlers: {
                    /*'before:prepare': function() {
                        this.options.correctResponse = this.aggregateParameters.type;
                    }, //move to the implementation code*/
                },
                content: [
                    //RawScreenObjects.namubonho.contents.object.line_template,
                    
                    //temporarily disabled:
                    RawScreenObjects.namubonho.contents.object.rectangle_template,
                    RawScreenObjects.namubonho.contents.object.ellipse_template,

                    //temporarily enabled:
                    //RawScreenObjects.namubonho.contents.object.ellipse_template2,
                    
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
            feedback_screen: () => new lab.canvas.Screen({
                title: 'feedbackScreen_namubonho',
                viewport: [800, 600],
                responses: RawScreenObjects.generic.responses.standard_noninput,
                tardy: true,
                datacommit: false,
                parameters: { //provides default values
                    bgColor: 'black',
                    fgColor: 'white',
                    fbTitle: 'RESPOSTA INDETERMINADA',
                    //fbMessage: '&eacute; indeterminado se a sua resposta est&aacute; correta.',
                    fbStatusMessage: 'não pode ter sua assertividade determinada',
                    fbHintMessage: 'Não é possível fazer recomendações para as',
                    fbAnswered: '<Sem Resposta>',
                    fbExpected: '<Resposta Correta Oculta>',
                    responseTime: 5,
                    screenWidth: 800,
                    screenHeight: 600,
                },
                content: [
                    RawScreenObjects.namubonho.feedback_screen.objects.background,
                    RawScreenObjects.namubonho.feedback_screen.objects.correctResponse_label,
                    RawScreenObjects.namubonho.feedback_screen.objects.correctResponse_value,
                    RawScreenObjects.namubonho.feedback_screen.objects.status_message,
                    RawScreenObjects.namubonho.feedback_screen.objects.hint_message,
                    RawScreenObjects.namubonho.feedback_screen.objects.response_label,
                    RawScreenObjects.namubonho.feedback_screen.objects.response_value,
                    RawScreenObjects.namubonho.feedback_screen.objects.time_label,
                    RawScreenObjects.namubonho.feedback_screen.objects.time_value,
                    RawScreenObjects.namubonho.feedback_screen.objects.title,
                    RawScreenObjects.namubonho.contents.object.ellipse_template,
                    RawScreenObjects.namubonho.contents.object.rectangle_template,
                ],
            }),
            /*feedback_screen: () => new lab.html.Screen({
                contentUrl: './ConceptTestPages/feedback.html',
                title: "feedback.html",
                parameters: {
                    bgColor: 'black',
                    fgColor: 'white',
                    fbTitle: 'RESPOSTA INDETERMINADA',
                    //fbMessage: '&eacute; indeterminado se a sua resposta est&aacute; correta.',
                    fbStatusMessage: 'não pode ter sua assertividade determinada',
                    fbHintMessage: '',
                    fbAnswered: '',
                    fbExpected: '(Resposta Correta Ocultada)',
                    responseTime: 5,
                    screenWidth: 800,
                    screenHeight: 600,
                },
                datacommit: false,
                tardy: true,
                responses: RawScreenObjects.generic.responses.standard_noninput,
                messageHandlers: {
                    /*'before:prepare': function() {
                        if (this.options.datastore.)
                    }
                }, //implement at the experimental code
            }),*/
        },
    },
};