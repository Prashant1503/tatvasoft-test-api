const ROW_LIMIT = 10;
exports.sendSuccess = function (data) {
    var notFound;
    if (data != null && data.count != undefined) {
        data.perPage = ROW_LIMIT
    }

    if (data != null && data.notFound != undefined) {
        notFound = data.notFound;
        data = null;
    }

    return {
        status: "Success",
        data: data == null ? {} : data,
        notFound: notFound
    }
}

exports.sendError = function (data) {
    var _data = {};
    var errorMessage;

    if (typeof error == "object") {
        if (error.errors && error.errors[0]) {
            _data = {
                field: error.errors[0]["path"],
                message: error.errors[0]["message"]
            }
        }
        else {
            if (error) {
                errorMessage = error
            }
            else {
                errorMessage = ""
            }
        }

        return {
            data: {
                data: _data,
                msg: errorMessage
            }
        }
    }
}