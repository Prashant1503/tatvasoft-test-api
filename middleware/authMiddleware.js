const jwt = require("jsonwebtoken")
const { secretKey } = require("../constants/constants")

module.exports = (req, res, next) => {
    if (req.headers.authorization) {

        jwt.verify(req.headers.authorization, secretKey, function (err, result) {
            if (err) {
                res.send({ msg: err })
            }

            console.log(result)
            req.userId = result.id;
            req.role = result.role;
            next()
        })
    }
    else {
        res.send({ msg: "No token provided!" })
    }
}