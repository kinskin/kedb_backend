import moment from "moment";

const logging = function (argument) {
    console.log(`[${moment().format()}] ${argument}`);
};

export { logging };
