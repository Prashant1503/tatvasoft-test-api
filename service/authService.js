const User = require("../models").User;


exports.getUserByDynamicClause = function (whereClause) {

    return new Promise((resolve, reject) => {
        User.findOne({ where: whereClause }).then((_user) => {
            resolve(_user)
        })
            .catch((err) => reject(err))
    })
}

/** @function : Create User */
exports.save = function (_user) {
    return new Promise((resolve, reject) => {
        User.create(_user).then((_result) => resolve(_result))
            .catch((error) => reject(error))
    })
}