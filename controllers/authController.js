var authService = require("../service/authService");
var responseFormat = require("../utils/responseFormat");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs")

var config = require("../config/config.json");
const user = require("../models/user");

const { secretKey } = require("../constants/constants")

/** @function : Register new user */
exports.register = (req, res) => {
    const { firstName, lastName, email, password, dob, role } = req.body;

    authService.getUserByDynamicClause({ email: req.body.email })
        .then(async (_user) => {
            console.log(_user)
            if (_user != null) {
                return res.send("User already exists..")
            }
            let user = {}
            const encryptedPassword = await bcrypt.hash(password, 10);

            console.log(encryptedPassword)
            user = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: encryptedPassword,
                dob: dob,
                role: role
            };


            console.log("executed 31 line..")
            await authService.save(user).then((_result) => {
                const token = jwt.sign({ id: _result.id }, secretKey, { expiresIn: '1h' });

                res.send({ user: _result, token: token })

            })
                .catch((error) => {
                    console.log('error ==> + ' + error)
                    res.send(responseFormat.sendError(error.message))
                })


        }).catch((err) => {

            console.log("ErR 48 ::" + err)
            res.send(err)
        })



}


/**@function : Login user */
exports.login = async (req, res) => {

    if (req.headers.authorization) {
        await authService.getUserByDynamicClause({ email: req.body.email })
            .then(async (_user) => {


                if (!_user) {
                    return res.send("No User Found!")
                }

                await bcrypt.compare(req.body.password, _user.password).then((_valid) => {

                    if (_valid) {
                        // generate token
                        const token = jwt.sign({ id: _user.id, role: _user.role }, secretKey, {
                            expiresIn: '1h'
                        });


                        _user.dataValues.token = token;

                        res.send(_user)
                    }
                    else {
                        res.send("Token generate failed!")
                    }
                })
            })
    }
    else {
        res.send("No token provided")
    }
}

