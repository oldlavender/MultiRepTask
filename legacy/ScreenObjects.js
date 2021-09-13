import "./extlib/lab.dev.js";
//import "../extlib/lab.fallback.js";
import { Handlers, Revision } from "./Handlers.js";
import { move, MoveLab } from "./extlib/move.lab.mjs";

Revision.ScreenObjects = {
    major: 0,
    minor: 4,
    rev: 46,
    timestamp: '2021-08-14 10:04PM',
};

/*String.prototype.fillTemplate = function(pars) {
    var fillTemplate;
    const keys = Object.keys(pars);
    const values = Object.values(pars);
    fillTemplate = new Function(...keys, `return \`${this}\`;`);
    return fillTemplate(...values);
};

Object.prototype.getParam = function(paramS) {
    var pars = '${'.concat(
        paramS,
        '}'
    );
    try {
        return pars.fillTemplate(this);
    }
    catch(e) {
        return '';
    }
    //var ret = `${this.paramS}`;
};*/
 
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
            dynamic_answer_labels: {
                ZWN_frame: {
                    id: 'ZWN_label', //left
                    type: 'i-text',
                    left: -350,
                    top: 135,
                    fontSize: 20,
                    text: '${parameters.data.label[0]}',
                    fill: '#000000',
                    stroke: '#000000',
                },
                OTB_frame: {
                    id: 'OTB_label', //right
                    type: 'i-text',
                    left: 350,
                    top: 135,
                    fontSize: 20,
                    text: '${parameters.data.label[1]}',
                    fill: '#000000',
                    stroke: '#000000',
                },
            },
            feedback_screen: {
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
                    text: "A sua resposta ${parameters.fbStatusMessage}",
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
                nocontent: {},
            },
        },
        responses: {
            standard_noninput: {
                'keypress(Space)': 'continue',
                'keypress(Enter)': 'continue',
                'keypress(Right)': 'continue',
                'click #continue': 'continue',
                'click #space': 'continue',
		'keypress(a)': '__TAG__',
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
        feedback_screen: {},
        properties: {
            responses: {
                'keypress(d)': 'namu',
                'keypress(f)': 'bonho',
		'keypress(a)': '__TAG__',
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
                    id: 'wug_buttonlabel', //left
                    type: 'i-text',
                    left: -350,
                    top: 135,
                    fontSize: 20,
                    text: 'Wug',
                    fill: '#000000',
                    stroke: '#000000',
                },
                tug_buttonlabel: {
                    id: 'tug_buttonlabel', //left
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
                    width: '${parameters.data.image.width-1}', 
                    height: '${ parameters.data.image.height - 2 }',
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
		'keypress(a)': '__TAG__',
                // DISABLED: used for mobile, but mobile was deactivated for
                // accuracy reasons (it didn't precisely registered RTs)
                //'click @left': 'namu',
                //'click @right': 'bonho',
            },
        },
    },
    zilnarolbar: {
        contents: {
            answer_labels: {
                zilnar_buttonlabel: {
                    id: 'zilnar_buttonlabel', //left
                    type: 'i-text',
                    left: -350,
                    top: 135,
                    fontSize: 20,
                    text: 'Zilnar',
                    fill: '#000000',
                    stroke: '#000000',
                },
                olbar_buttonlabel: {
                    id: 'olbar_buttonlabel', //left
                    type: 'i-text',
                    left: 350,
                    top: 135,
                    fontSize: 20,
                    text: 'Olbar',
                    fill: '#000000',
                    stroke: '#000000',
                },
            },
            object: {
                // namu-bonho structure, positioned at left 
                ellipse_template: {
                    id: 'Object_p1',
                    type: 'ellipse',
                    left: -199,
                    top: 0,
                    width: '${parameters.data.object.ellipseWidth}', //changed from fixed 140
                    height: 20,
                    //strokeWidth: 1,
                    stroke: 'rgb(255,255,255)',
                    fill: 'black',
                    angle: 45,
                    //angle: '${parameters.p1Angle}', //kept for log purposes
                    /*updaters: {
                        left: {
                            id: 'p1_horizontal_movement',
                            type: 'Linear',
                            duration: 500,
                            start: -250,
                            end: 250,
                        }
                    },*/
                },
                rectangle_template: {
                    id: 'Object_p2',
                    type: 'rect', //rectangle
                    left: -199,
                    top: 0,
                    width: '${parameters.data.object.rectangleWidth}',
                    height: '25',
                    fill: 'black',
                    angle: 45+90,
                    // angle: '${parameters.p1Angle+90}', //kept for log purposes
                    // angle: '${parameters.p2Angle}', //kept for log purposes
                    /*updaters: {
                        left: {
                            id: 'p1_horizontal_movement',
                            type: 'Linear',
                            duration: 500,
                            start: -250,
                            end: 250,
                        }
                    },*/
                },
                white_stripe: {
                    id: 'white_stripe',
                    type: 'rect',
                    left: 0,
                    top: 0,
                    width: 800,
                    height: 350,
                    fill: '#ffffff',
                },
                subj_image_center: {
                    id: 'zo_wugtug_image',
                    type: 'image',
                    left: -306,
                    top: 0,
                    src: '${parameters.data.subject.image.filename}',
                    width: '${parameters.data.subject.image.width}',
                    height: '${parameters.data.subject.image.height}',
                    fill: '${parameters.data.subject.colorRgbHex}'
                },
                subj_bg_square: {
                    id: 'zo_wugtug_bg_square',
                    type: 'rect',
                    left: -306,
                    top: 0,
                    width: '${parameters.data.subject.image.width - 1}',
                    height: '${parameters.data.subject.image.height - 1}',
                    fill: '${parameters.data.subject.colorRgbHex}',
                    //angle: 45+90,
                },
            },
        },
        properties: {
            responses: {
                'keypress(d)': 'zilnar',
                'keypress(f)': 'olbar',
		'keypress(a)': '__TAG__',
                // DISABLED: used for mobile, but mobile was deactivated for
                // accuracy reasons (it didn't precisely registered RTs)
                //'click @left': 'zilnar',
                //'click @right': 'olbar',
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
                updaters: { // TODO: Maybe remove it later
                    angle: {
                        type: 'Linear',
                        duration: 400,
                        start: 0,
                        end: 450,
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
                updaters: { // TODO: Maybe remove it later
                    angle: {
                        type: 'Linear',
                        duration: 400,
                        start: 90,
                        end: 540,
                    },
                },
            },
        ],
        left: [ 
            {
                id: 'left_fxcross_horiz',
                type: 'line',
                left: -227,
                top: 0,
                width: 65,
                strokeWidth: 6,
                angle: 0,
                stroke: "#fcbb0a",
                updaters: { // TODO: Maybe remove it later
                    angle: {
                        type: 'Linear',
                        duration: 400,
                        start: 0,
                        end: 450,
                    },
                },
            },
            {
                id: 'left_fxcross_vert',
                type: 'line',
                left: -227,
                top: 0,
                width: 65,
                strokeWidth: 6,
                angle: 90,
                stroke: "#fcbb0a",
                updaters: { // TODO: Maybe remove it later
                    angle: {
                        type: 'Linear',
                        duration: 400,
                        start: 90,
                        end: 540,
                    },
                },
            },
        ],
        dynamic: [
            {
                id: 'dyn_fxcross_horiz',
                type: 'line',
                left: '${parameters.data.position.x}',
                top: '${parameters.data.position.y}',
                width: 65,
                strokeWidth: 6,
                angle: 0,
                stroke: "#fcbb0a",
                /*updaters: { // TODO: Maybe remove it later
                    angle: {
                        type: 'Linear',
                        duration: 400,
                        start: 0,
                        end: 450,
                    },
                },*/
            },
            {
                id: 'dyn_fxcross_vert',
                type: 'line',
                left: '${parameters.data.position.x}',
                top: '${parameters.data.position.y}',
                width: 65,
                strokeWidth: 6,
                angle: 90,
                stroke: "#fcbb0a",
                /*updaters: { // TODO: Maybe remove it later
                    angle: {
                        type: 'Linear',
                        duration: 400,
                        start: 90,
                        end: 540,
                    },
                },*/
            },
        ],
    },
    trial: {
        contents:{
            object: {
                nb_ellipse_template: {
                    id: 'Object_p1',
                    type: 'ellipse',
                    left: 0,
                    top: 0,
                    width: '${parameters?.data?.ellipseWidth}', //changed from fixed 140
                    height: 20,
                    //strokeWidth: 1,
                    stroke: 'rgb(255,255,255)',
                    fill: 'black',
                    angle: 45
                },
                nb_rectangle_template: {
                    id: 'Object_p2',
                    type: 'rect', //rectangle
                    left: 0,
                    top: 0,
                    width: '${parameters.data?.rectangleWidth}',
                    height: '25',
                    fill: 'black',
                    angle: 45+90,
                },
                wt_image_center: {
                    id: 'wugtug_image',
                    type: 'image',
                    left: 0,
                    top: 0,
                    src: '${parameters.data?.image?.filename}',
                    width: '${parameters.data?.image?.width}',
                    height: '${parameters.data?.image?.height}',
                    fill: '${parameters.data?.colorRgbHex}'
                },
                wt_bg_square: {
                    id: 'wugtug_bg_square',
                    type: 'rect',
                    left: 0,
                    top: 0,
                    width: '${parameters.data?.image?.width -2}', 
                    height: '${ parameters.data?.image?.height - 2}',
                    fill: '${parameters.data?.colorRgbHex}',
                    //angle: 45+90,
                },
                zo_ellipse_template: {
                    id: 'Object_p1',
                    type: 'ellipse',
                    left: -199,
                    top: 0,
                    width: '${parameters.data?.object?.ellipseWidth}', //changed from fixed 140
                    height: 20,
                    //strokeWidth: 1,
                    stroke: 'rgb(255,255,255)',
                    fill: 'black',
                    angle: 45,
                },
                zo_rectangle_template: {
                    id: 'Object_p2',
                    type: 'rect', //rectangle
                    left: -199,
                    top: 0,
                    width: '${parameters.data?.object?.rectangleWidth}',
                    height: '25',
                    fill: 'black',
                    angle: 45+90,
                },
                zo_subj_image_center: {
                    id: 'zo_wugtug_image',
                    type: 'image',
                    left: -306,
                    top: 0,
                    src: '${parameters.data?.subject?.image?.filename}',
                    width: '${parameters.data?.subject?.image?.width}',
                    height: '${parameters.data?.subject?.image?.height}',
                    fill: '${parameters.data?.subject?.colorRgbHex}'
                },
                zo_subj_bg_square: {
                    id: 'zo_wugtug_bg_square',
                    type: 'rect',
                    left: -306,
                    top: 0,
                    width: '${parameters.data?.subject?.image?.width - 2}',
                    height: '${parameters.data?.subject?.image?.height - 2}',
                    fill: '${parameters.data?.subject?.colorRgbHex}',
                    //angle: 45+90,
                },
                fill_blank_sentence: {
                    id: 'fill_blank_sentence',
                    type: 'i-text',
                    //
                    left: 10,
                    top: 100,
                    fontSize: 28,
                    text: '${parameters.data?.sentence?.blank}',
		    fontWeight: 'bold',
                    fill: '#000000',
                    stroke: '#000000',
                },
		full_sentence: {
                    id: 'fill_blank_sentence',
                    type: 'i-text',
                    left: 10,
                    top: 100,
                    fontSize: 28,
                    text: '${parameters.data?.sentence?.full}',
		    //fontWeight: 'bold',
                    fill: '#000000',
                    stroke: '#000000',
		},
            },
        },
        properties: {
            
        },
    }
};

export const ScreenObjects = {
    templates: {
        generic: {
            fxcross: {
                canvas: (
                    oContent=RawScreenObjects.fxcross.center,
                    oTitle='fxcross',
                    oPlugins=[],
                    oTimeout=500
                ) => new lab.canvas.Screen({
                    title: oTitle,
                    datacommit: false,
                    timeout: oTimeout,
                    scrollTop: true,
                    viewport: [800, 600],
                    content: oContent,
                    plugins: oPlugins,
                }),
            },
            canvas: {
                task_canvas: (
                    oContent=[],
                    oResponses={},
                    oTitle='untitled-canvas',
                    oMsgHandlers={},
                    oPlugins=[],
                    oTimeout=5000
                ) => new lab.canvas.Screen({
                    title: oTitle,
                    timeout: oTimeout,
                    viewport: [800, 600],
                    scrollTop: true,
                    responses: oResponses,
                    messageHandlers: oMsgHandlers,
                    content: oContent,
                    plugins: oPlugins,
                }),
                feedback_screen: function(
                    addContents=[],
                    oPlugins=[],
                    oMsgHandlers={
                        'before:prepare': Handlers.handlers.generic.fb_before_prepare,
                    }
                )
                {
                    let content, fixed = [
                        RawScreenObjects.generic.contents.feedback_screen.background,
                        RawScreenObjects.generic.contents.feedback_screen.correctResponse_label,
                        RawScreenObjects.generic.contents.feedback_screen.correctResponse_value,
                        RawScreenObjects.generic.contents.feedback_screen.status_message,
                        RawScreenObjects.generic.contents.feedback_screen.hint_message,
                        RawScreenObjects.generic.contents.feedback_screen.response_label,
                        RawScreenObjects.generic.contents.feedback_screen.response_value,
                        RawScreenObjects.generic.contents.feedback_screen.time_label,
                        RawScreenObjects.generic.contents.feedback_screen.time_value,
                        RawScreenObjects.generic.contents.feedback_screen.title,
                    ];
                    content =fixed.concat(addContents);
                    //addContents.forEach(i => content.push(i));
                    return new lab.canvas.Screen({
                        title: 'feedbackScreen_namubonho',
                        viewport: [800, 600],
                        responses: RawScreenObjects.generic.responses.standard_noninput,
                        tardy: true,
                        datacommit: false,
                        scrollTop: true,
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
                        plugins: oPlugins,
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
                    nSize=0,
                    oTitle='unamed_loop',
                    oPlugins=[],
                    sampleMode='draw'
                ) => new lab.flow.Loop({
                    title: oTitle,
                    template: oTemplate,
                    templateParameters: oParameters,
                    shuffle: oShuffle,
                    parameters: {},
                    plugins: oPlugins,
                    sample: {
                        n: nSize,
                        mode: sampleMode,
                    },
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
                scrollTop: true,
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
                scrollTop: true,
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
                    RawScreenObjects.generic.contents.feedback_screen.background,
                    RawScreenObjects.generic.contents.feedback_screen.correctResponse_label,
                    RawScreenObjects.generic.contents.feedback_screen.correctResponse_value,
                    RawScreenObjects.generic.contents.feedback_screen.status_message,
                    RawScreenObjects.generic.contents.feedback_screen.hint_message,
                    RawScreenObjects.generic.contents.feedback_screen.response_label,
                    RawScreenObjects.generic.contents.feedback_screen.response_value,
                    RawScreenObjects.generic.contents.feedback_screen.time_label,
                    RawScreenObjects.generic.contents.feedback_screen.time_value,
                    RawScreenObjects.generic.contents.feedback_screen.title,
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
        welcome: (url, config={}, lang={}) => ScreenObjects.templates.generic.pages.html_page(
            url,
            {
                //parameters
                Revision: Revision,
                RevInfo: '',
                config,
                lang,
            },
            {
                //message handlers
                'before:prepare': Handlers.handlers.welcome.before_prepare,
            }
        ),
    },
    fixcross: {
        standard: ScreenObjects.templates.generic.fxcross.canvas(),
        preanimation: ScreenObjects.templates.generic.fxcross.canvas(
            RawScreenObjects.fxcross.left,
            'left_fxcross'
        ),
        dynamic: ScreenObjects.templates.generic.fxcross.canvas(
            RawScreenObjects.fxcross.dynamic,
            'dyn_fxcross' // add MoveLab plugin again
        ),
    },
    instruction: {
        generic: (url, config, lang)=>ScreenObjects.templates.generic.pages.html_page(
            url,
            {
                config,
                lang,
            },
        ),
    },
    task: {
        namubonho_learning: 
            ScreenObjects.templates.namubonho.task_canvas(
                {
                    // ATTENTION: This is the #TASK
                    // messageHandlers
                    'before:prepare': 
                        Handlers.handlers.generic.learning_before_prepare,
                    'after:end': Handlers.handlers.generic.increase_streaks,
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
                'before:prepare': Handlers.handlers.generic.learning_before_prepare,
                'after:end': Handlers.handlers.generic.increase_streaks,
            } // messageHandlers
        ),
        zilnarolbar_learning: ScreenObjects.templates.generic.canvas.task_canvas(
            [
                RawScreenObjects.generic.contents.left_button.aoi,
                RawScreenObjects.generic.contents.left_button.ellipse,
                RawScreenObjects.generic.contents.left_button.text,
                RawScreenObjects.generic.contents.right_button.aoi,
                RawScreenObjects.generic.contents.right_button.ellipse,
                RawScreenObjects.generic.contents.right_button.text,
                RawScreenObjects.zilnarolbar.contents.answer_labels.zilnar_buttonlabel,
                RawScreenObjects.zilnarolbar.contents.answer_labels.olbar_buttonlabel,
                RawScreenObjects.zilnarolbar.contents.object.ellipse_template,
                RawScreenObjects.zilnarolbar.contents.object.rectangle_template,
                RawScreenObjects.zilnarolbar.contents.object.subj_bg_square,
                RawScreenObjects.zilnarolbar.contents.object.subj_image_center,
            ],
            RawScreenObjects.zilnarolbar.properties.responses,
            'zilnarolbar_learning',
            {
                'before:prepare': Handlers.handlers.generic.learning_before_prepare,
                'after:end': Handlers.handlers.generic.increase_streaks,
            },
            [
                new Handlers.classes.UpdaterSetup({
                    title: 'zilnarolbar_learning_task',
                    installEvent: 'before:prepare',
                    log: false,
                    verbose: false,
                    destinationContentIds: [
                        'Object_p1',
                        'Object_p2',
                    ],
                }),
                new MoveLab({title: 'zo_l_t'}),
            ]
        ),
        association: ScreenObjects.templates.generic.canvas.task_canvas(
            [
                RawScreenObjects.generic.contents.left_button.aoi,
                RawScreenObjects.generic.contents.left_button.ellipse,
                RawScreenObjects.generic.contents.left_button.text,
                RawScreenObjects.generic.contents.right_button.aoi,
                RawScreenObjects.generic.contents.right_button.ellipse,
                RawScreenObjects.generic.contents.right_button.text,
                RawScreenObjects.generic.contents.dynamic_answer_labels.ZWN_frame,
                RawScreenObjects.generic.contents.dynamic_answer_labels.OTB_frame,
                //RawScreenObjects.trial.contents.object.wt_bg_square,
                //RawScreenObjects.trial.contents.object.nb_ellipse_template,
                //RawScreenObjects.trial.contents.object.nb_rectangle_template,
                //RawScreenObjects.trial.contents.object.wt_image_center,
                //RawScreenObjects.zilnarolbar.contents.object.white_stripe,
                RawScreenObjects.trial.contents.object.zo_subj_bg_square,
                RawScreenObjects.trial.contents.object.zo_subj_image_center,
                RawScreenObjects.trial.contents.object.zo_ellipse_template,
                RawScreenObjects.trial.contents.object.zo_rectangle_template,
                RawScreenObjects.trial.contents.object.fill_blank_sentence,
            ],
            RawScreenObjects.zilnarolbar.properties.responses,
            'association',
            {
                'before:prepare': Handlers.handlers.generic.trial_before_prepare,
            },
            [
                new Handlers.classes.UpdaterSetup({
                    title: 'association_task',
                    installEvent: 'before:prepare',
                    log: false,
                    verbose: false,
                    destinationContentIds: [
                        'Object_p1',
                        'Object_p2',
                    ],
                }),
                new MoveLab({title: 'assoc_tsk'}),            
            ]
        ),
        trial: ScreenObjects.templates.generic.canvas.task_canvas(
            [
                RawScreenObjects.generic.contents.left_button.aoi,
                RawScreenObjects.generic.contents.left_button.ellipse,
                RawScreenObjects.generic.contents.left_button.text,
                RawScreenObjects.generic.contents.right_button.aoi,
                RawScreenObjects.generic.contents.right_button.ellipse,
                RawScreenObjects.generic.contents.right_button.text,
                RawScreenObjects.generic.contents.dynamic_answer_labels.ZWN_frame,
                RawScreenObjects.generic.contents.dynamic_answer_labels.OTB_frame,
                //RawScreenObjects.trial.contents.object.wt_bg_square,
                //RawScreenObjects.trial.contents.object.nb_ellipse_template,
                //RawScreenObjects.trial.contents.object.nb_rectangle_template,
                //RawScreenObjects.trial.contents.object.wt_bg_square,
                RawScreenObjects.trial.contents.object.zo_ellipse_template,
                RawScreenObjects.trial.contents.object.zo_rectangle_template,
                RawScreenObjects.trial.contents.object.zo_subj_bg_square,
                RawScreenObjects.trial.contents.object.zo_subj_image_center,
                RawScreenObjects.trial.contents.object.fill_blank_sentence,
            ],
            RawScreenObjects.zilnarolbar.properties.responses,
            'trial',
            {
                'before:prepare': Handlers.handlers.generic.trial_before_prepare,
            },
            [
                new Handlers.classes.UpdaterSetup({
                    title: 'trial_task',
                    installEvent: 'before:prepare',
                    log: false,
                    verbose: false,
                    destinationContentIds: [
                        'Object_p1',
                        'Object_p2',
                    ],
                }),
                new MoveLab({title: 'trial_task'}),            
            ]
        ),
    },
    feedback: {
        namubonho_learning: (nStreaks) => ScreenObjects.templates.namubonho.feedback_screen(
            {
                //messageHandlers
                //'show': Handlers.handlers.generic.log_handler,
                'before:prepare': Handlers.handlers.generic.fb_before_prepare,
                'after:end': Handlers.handlerGenerators.end_streaks(nStreaks),
            }
        ),
        wugtug_learning: (nStreaks) => ScreenObjects.templates.generic.canvas.feedback_screen(
            [
                RawScreenObjects.zilnarolbar.contents.object.white_stripe,
                RawScreenObjects.wugtug.contents.object.bg_square,
                RawScreenObjects.wugtug.contents.object.image_center,
            ],
            [],
            {
                'before:prepare': Handlers.handlers.generic.fb_before_prepare,
                'after:end': Handlers.handlerGenerators.end_streaks(nStreaks),
            }
        ),
        zilnarolbar_learning: (nStreaks) => ScreenObjects.templates.generic.canvas.feedback_screen(
            [
                RawScreenObjects.zilnarolbar.contents.object.white_stripe,
                RawScreenObjects.zilnarolbar.contents.object.ellipse_template,
                RawScreenObjects.zilnarolbar.contents.object.rectangle_template,
                RawScreenObjects.zilnarolbar.contents.object.subj_bg_square,
                RawScreenObjects.zilnarolbar.contents.object.subj_image_center,
            ],
            [
                new Handlers.classes.UpdaterSetup({
                    title: 'zilnarolbar_feedback',
                    installEvent: 'before:prepare',
                    log: false,
                    verbose: false,
                    destinationContentIds: [
                        'Object_p1',
                        'Object_p2',
                    ],
                }),
                new MoveLab({title: 'zo_feedback'}),
            ],
            {
                'before:prepare': Handlers.handlers.generic.fb_before_prepare,
                'after:end': Handlers.handlerGenerators.end_streaks(nStreaks),
            }
        ),
        association: (nStreaks)=>ScreenObjects.templates.generic.canvas.feedback_screen(
            [
                //RawScreenObjects.trial.contents.object.wt_bg_square,
                //RawScreenObjects.trial.contents.object.nb_ellipse_template,
                //RawScreenObjects.trial.contents.object.nb_rectangle_template,
                //RawScreenObjects.trial.contents.object.wt_bg_square,
                RawScreenObjects.zilnarolbar.contents.object.white_stripe,
                RawScreenObjects.trial.contents.object.zo_subj_bg_square,
                RawScreenObjects.trial.contents.object.zo_subj_image_center,
                RawScreenObjects.trial.contents.object.zo_ellipse_template,
                RawScreenObjects.trial.contents.object.zo_rectangle_template,
                RawScreenObjects.trial.contents.object.full_sentence,
            ],
            [
                new Handlers.classes.UpdaterSetup({
                    title: 'association_feedback',
                    installEvent: 'before:prepare',
                    log: false,
                    verbose: false,
                    destinationContentIds: [
                        'Object_p1',
                        'Object_p2',
                    ],
                }),
                new MoveLab({title: 'association_feedback'}),
            ],
            {
                'before:prepare': Handlers.handlers.generic.fb_before_prepare_nc,
            }
        ),
        trial: (nStreaks)=>ScreenObjects.templates.generic.canvas.feedback_screen(
            [
                //RawScreenObjects.trial.contents.object.wt_bg_square,
                //RawScreenObjects.trial.contents.object.nb_ellipse_template,
                //RawScreenObjects.trial.contents.object.nb_rectangle_template,
                //RawScreenObjects.trial.contents.object.wt_bg_square,
                RawScreenObjects.zilnarolbar.contents.object.white_stripe,
                RawScreenObjects.trial.contents.object.zo_ellipse_template,
                RawScreenObjects.trial.contents.object.zo_rectangle_template,
                RawScreenObjects.trial.contents.object.zo_subj_bg_square,
                RawScreenObjects.trial.contents.object.zo_subj_image_center,
                RawScreenObjects.trial.contents.object.full_sentence,
            ],
            [
                new Handlers.classes.UpdaterSetup({
                    title: 'trial_feedback',
                    installEvent: 'before:prepare',
                    log: false,
                    verbose: false,
                    destinationContentIds: [
                        'Object_p1',
                        'Object_p2',
                    ],
                }),
                new MoveLab({title: 'trial_feedback'}),
            ],
            {
                'before:prepare': Handlers.handlers.generic.fb_before_prepare_nc,
            }
        ),
    },
    sequence: {
        namubonho_learning: (nStreaks) => ScreenObjects.templates.generic.flow.advanced_seq(
            [ //sequence contents
                Screens.fixcross.standard,
                Screens.task.namubonho_learning,
                Screens.feedback.namubonho_learning(nStreaks),
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
        wugtug_learning: (nStreaks) => ScreenObjects.templates.generic.flow.advanced_seq(
            [
                Screens.fixcross.standard,
                Screens.task.wugtug_learning,
                Screens.feedback.wugtug_learning(nStreaks),
            ],
            'wugtug_learning'
        ),
        zilnarolbar_learning: (nStreaks) => ScreenObjects.templates.generic.flow.advanced_seq(
            [
                Screens.fixcross.preanimation,
                Screens.task.zilnarolbar_learning,
                Screens.feedback.zilnarolbar_learning(nStreaks),
            ],
            'zilnarolbar_learning'
        ),
        association: (nStreaks) => ScreenObjects.templates.generic.flow.advanced_seq(
            [
                Screens.fixcross.dynamic,
                Screens.task.association,
                Screens.feedback.association(nStreaks),
            ],
            'association'
        ),
        trial: (nStreaks) => ScreenObjects.templates.generic.flow.advanced_seq(
            [
                Screens.fixcross.dynamic,
                Screens.task.trial,
                Screens.feedback.trial(nStreaks),
            ],
            'trial'
        ),
    },
    /*loop: {
        namubonho_learning: null,
    },*/
};
/*Screens.sequence = {
    namubonho_learning: 
    wugtug_learning: ,
    zilnarolbar_learning: ,
};*/
