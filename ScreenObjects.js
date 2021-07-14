import "./lib/lab.js";
import "./lib/lab.fallback.js";
import { Handlers, Revision } from "./Handlers.js";

Revision.ScreenObjects = {
    major: 0,
    minor: 3,
    rev: 18,
    timestamp: '2021-07-14 1:12AM',
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
                ellipse_template: {
                    id: 'Object_p1',
                    type: 'ellipse',
                    left: 0,
                    top: 0,
                    width: '${parameters.data.ellipseWidth}', //changed from fixed 140
                    height: 20,
                    //strokeWidth: 1,
                    stroke: 'rgb(255,255,255)',
                    fill: 'black',
                    angle: 45
                    //angle: '${parameters.p1Angle}', //kept for log purposes 
                },
                ellipse_template2: { 
                    // @TODO: Remove it when it's safe
                    //experimental, trying with two ellipses
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
                    width: '${parameters.data.rectangleWidth}',
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
                // DISABLED: used for mobile, but mobile was deactivated for
                // accuracy reasons (it didn't precisely registered RTs)
                //'click @left': 'namu',
                //'click @right': 'bonho',
            },
        },
    },
    wugtug: {
        contents: {
            answer_labels: {
                wug_buttonlabel: {
                    id: 'namu_buttonlabel', //left
                    type: 'i-text',
                    left: -350,
                    top: 135,
                    fontSize: 20,
                    text: 'Wug',
                    fill: '#000000',
                    stroke: '#000000',
                },
                tug_buttonlabel: {
                    id: 'bonho_buttonlabel', //left
                    type: 'i-text',
                    left: 350,
                    top: 135,
                    fontSize: 20,
                    text: 'Tug',
                    fill: '#000000',
                    stroke: '#000000',
                },
            },
            object: {
                image_center: {
                    id: 'wugtug_image',
                    type: 'image',
                    left: 0,
                    top: 0,
                    src: '${parameters.data.image.filename}',
                    width: '${parameters.data.image.width}',
                    height: '${parameters.data.image.height}',
                    fill: '${parameters.data.colorRgbHex}'
                },
                bg_square: {
                    id: 'wugtug_bg_square',
                    type: 'rect',
                    left: 0,
                    top: 0,
                    width: '${ parameters.data.image.width - 1 }',
                    height: '${ parameters.data.image.height - 1 }',
                    fill: '${parameters.data.colorRgbHex}',
                    //angle: 45+90,
                },
            },
        },
        feedback_screen: {},
        properties: {
            responses: {
                'keypress(d)': 'wug',
                'keypress(f)': 'tug',
                // DISABLED: used for mobile, but mobile was deactivated for
                // accuracy reasons (it didn't precisely registered RTs)
                //'click @left': 'namu',
                //'click @right': 'bonho',
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
                center_canvas: (
                    oTitle='fxcross',
                    oTimeout=500,
                    oContent=RawScreenObjects.fxcross.center
                ) => new lab.canvas.Screen({
                    title: oTitle,
                    datacommit: false,
                    timeout: oTimeout,
                    viewport: [800, 600],
                    content: oContent,
                }),
            },
            canvas: {
                task_canvas: (
                    oContent=[],
                    oResponses={},
                    oTitle='untitled-canvas',
                    oMsgHandlers={},
                    oTimeout=5000
                ) => new lab.canvas.Screen({
                    title: oTitle,
                    timeout: oTimeout,
                    viewport: [800, 600],
                    responses: oResponses,
                    messageHandlers: oMsgHandlers,
                    content: oContent,
                }),
                feedback_screen: function(
                    addContents=[],
                    oMsgHandlers={
                        'before:prepare': Handlers.handlers.generic.fb_before_prepare,
                    }
                )
                {
                    let content, fixed = [
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
                    ];
                    content =fixed.concat(addContents);
                    //addContents.forEach(i => content.push(i));
                    return new lab.canvas.Screen({
                        title: 'feedbackScreen_namubonho',
                        viewport: [800, 600],
                        responses: RawScreenObjects.generic.responses.standard_noninput,
                        tardy: true,
                        datacommit: false,
                        parameters: { //provides default values
                            bgColor: 'black',
                            fgColor: 'white',
                            fbTitle: 'RESPOSTA INDETERMINADA',
                            fbStatusMessage: 'não pode ter sua assertividade determinada',
                            fbHintMessage: 'Não é possível fazer recomendações para as',
                            fbAnswered: '<Sem Resposta>',
                            fbExpected: '<Resposta Correta Oculta>',
                            responseTime: 5,
                            screenWidth: 800,
                            screenHeight: 600,
                        },
                        content: content,
                        messageHandlers: oMsgHandlers,
                    });
                },
            },
            pages: {
                html_page: (
                    oUrl,
                    oParameters={},
                    oMessageHandlers={},
                    oCommit=false, 
                    oResp=RawScreenObjects.generic.responses.standard_noninput) => 
                        new lab.html.Screen({
                            contentUrl: oUrl,
                            datacommit: oCommit,
                            responses: oResp,
                            title: oUrl,
                            parameters: oParameters,
                            messageHandlers: oMessageHandlers,
                }),
            },
            flow: {
                sequence: (
                    oContent=[],
                    oTitle='unamed_seq',
                    oCommit=false
                ) => new lab.flow.Sequence({
                    title: oTitle,
                    datacommit: oCommit,
                    content: oContent,
                }),
                advanced_seq: (
                    oContent=[],
                    oTitle='unamed_seq',
                    oParameters={},
                    oMessageHandlers={},
                    oPlugins=[],
                    oCommit=false
                ) => new lab.flow.Sequence({
                    title: oTitle,
                    datacommit: oCommit,
                    content: oContent,
                    plugins: oPlugins,
                    parameters: oParameters,
                    messageHandlers: oMessageHandlers,
                }),
                loop: (
                    oTemplate,
                    oParameters,
                    oShuffle=true,
                    oTitle='unamed_loop',
                    oPlugins=[]
                ) => new lab.flow.Loop({
                    title: oTitle,
                    template: oTemplate,
                    templateParameters: oParameters,
                    shuffle: oShuffle,
                    parameters: {},
                    plugins: oPlugins,
                }),
            }
        },
        introduction: {
            welcome: {
                welcome_screen: () => new lab.html.Screen({
                    contentUrl: './Pages/welcome.html',
                    datacommit: false,
                    responses: RawScreenObjects.generic.responses.standard_noninput,
                    title: 'welcome.html',
                }),
            },
        },
        namubonho: {
            task_canvas: (
                oMsgHandlers={}
            ) => new lab.canvas.Screen({
                title: 'stimulusScreen_namubonho',
                timeout: 5000,
                viewport: [800, 600],
                responses: RawScreenObjects.namubonho.properties.responses,
                messageHandlers: oMsgHandlers,
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
            feedback_screen: (
                oMsgHandlers={}
            ) => new lab.canvas.Screen({
                title: 'feedbackScreen_namubonho',
                viewport: [800, 600],
                responses: RawScreenObjects.generic.responses.standard_noninput,
                tardy: true,
                datacommit: false,
                parameters: { //provides default values
                    bgColor: 'black',
                    fgColor: 'white',
                    fbTitle: 'RESPOSTA INDETERMINADA',
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
                messageHandlers: oMsgHandlers,
            }),
        },
    },
};

export const Screens = {
    presentation: {
        welcome: ScreenObjects.templates.generic.pages.html_page(
            "Pages/welcome.html",
            {
                //parameters
                Revision: Revision,
                RevInfo: '',
            },
            {
                //message handlers
                'before:prepare': Handlers.handlers.welcome.before_prepare,
            }
        ),
    },
    fixcross: {
        standard: ScreenObjects.templates.generic.fxcross.center_canvas(),
    },
    instruction: {

    },
    task: {
        namubonho_learning: 
            ScreenObjects.templates.namubonho.task_canvas(
                {
                    // ATTENTION: This is the #TASK
                    // messageHandlers
                    'before:prepare': 
                        Handlers.handlers.generic.trial_before_prepare,
                }
            ),
        wugtug_learning: ScreenObjects.templates.generic.canvas.task_canvas(
            [
                RawScreenObjects.generic.contents.left_button.aoi,
                RawScreenObjects.generic.contents.left_button.ellipse,
                RawScreenObjects.generic.contents.left_button.text,
                RawScreenObjects.generic.contents.right_button.aoi,
                RawScreenObjects.generic.contents.right_button.ellipse,
                RawScreenObjects.generic.contents.right_button.text,
                RawScreenObjects.wugtug.contents.answer_labels.wug_buttonlabel,
                RawScreenObjects.wugtug.contents.answer_labels.tug_buttonlabel,
                RawScreenObjects.wugtug.contents.object.bg_square,
                RawScreenObjects.wugtug.contents.object.image_center,
            ], //content
            RawScreenObjects.wugtug.properties.responses,
            'wugtug_learning',
            {
                'before:prepare': Handlers.handlers.generic.trial_before_prepare,
            } // messageHandlers
        ),
    },
    feedback: {
        namubonho_learning: ScreenObjects.templates.namubonho.feedback_screen(
            {
                //messageHandlers
                //'show': Handlers.handlers.generic.log_handler,
                'before:prepare': Handlers.handlers.generic.fb_before_prepare,
            }
        ),
        wugtug_learning: ScreenObjects.templates.generic.canvas.feedback_screen(
            [
                RawScreenObjects.wugtug.contents.object.bg_square,
                RawScreenObjects.wugtug.contents.object.image_center,
            ]
        ),
    },
    sequence: {
        namubonho_learning: undefined,
        wugtug_learning: undefined,
    },
    /*loop: {
        namubonho_learning: null,
    },*/
};
Screens.sequence = {
    namubonho_learning: ScreenObjects.templates.generic.flow.advanced_seq(
        [ //sequence contents
            Screens.fixcross.standard,
            Screens.task.namubonho_learning,
            Screens.feedback.namubonho_learning,
        ],
        'namubonho_learning', //sequence title
        // ATTENTION: This is the #LOOP_SEQUENCE
        {
            //parameters
        },
        {
            // messageHandlers
        }
    ),
    wugtug_learning: ScreenObjects.templates.generic.flow.advanced_seq(
        [
            Screens.fixcross.standard,
            Screens.task.wugtug_learning,
            Screens.feedback.wugtug_learning,
        ],
        'wugtug_learning',
    ),
};
