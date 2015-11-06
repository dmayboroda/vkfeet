function getParamValue(url, name) {
    "use strict";

    var params  = url.substr(url.indexOf("#") + 1);
    params = params.split("&");
	var value;

    for (var index = 0; index < params.length; index += 1) {
        var temp = params[index].split("=");

        if (temp[0] === name) {
            value = temp[1];
            break;
        }
    }
    return value;
}

function onError(title, message) {
    "use strict";
    alert(title + '\n' + message);
}