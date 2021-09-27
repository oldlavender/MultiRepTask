import { LabCanvasText } from "../../lib/labobjects/canvascontent/LabCanvasText.mjs";
import { LabResponse } from "../../lib/labobjects/LabResponse.mjs";
import { ScreenButton } from "../../lib/utils/screen/ScreenFunctions.mjs";

const buttons_y = -60 -33; /*character inages on namu/bonho have a height
    of 120, and buttons have a height of 65, we need half of each negative
*/
const button_size = 66;

var left_button = ScreenButton(
    'left', 'L', 'white', 'green', button_size, buttons_y,
    -400 + (button_size/2) 
    /* 
                                buttons left position based on the horizontal
                                borders (-400,400) and the button
                                size divided by two (as they're 
                                center-oriented)
    */
); 
var right_button = ScreenButton(
    'right', 'R', 'white', 'green', button_size,
    buttons_y, 400 - (button_size/2) //same logic as left button
);

var left_button_label = new LabCanvasText(
    '${parameters.screens.labels.left}',    // @TODO: Update this field into
    undefined, buttons_y - (button_size/2)  //  the model
);
left_button[0].LinkProperty(
    'left', [left_button_label, left_button[1], left_button[2]], true, true
);

var right_button_label = new LabCanvasText(
    '${parameters.labels.right}',    // @TODO: Update this field into the model
    undefined, buttons_y - (button_size/2) 
);
right_button[0].LinkProperty(
    'left', [right_button_label, right_button[1], right_button[2]], true, true
);

var instructscreen_response = new LabResponse().SetKeyResponses(
    ['Esc', 'Enter', 'Right'], 'continue'
).SetClickResponses(['#continue', '#space'], 'continue');

