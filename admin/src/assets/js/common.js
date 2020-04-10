import {Message} from "element-ui";
 export const messages = function (type, message, duration = 500) {
    Message({
        type: type,
        message: message,
        duration: duration
    });
};