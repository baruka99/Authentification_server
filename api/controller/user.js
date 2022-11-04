const User = require('../models/user_model');
const Credential = require('../models/creadential')
const { STATUSCODE } = require('../configs/data')
const sgMail = require('@sendgrid/mail');
const { randomString } = require('../shared/utils')
const bcrypt = require('bcryptjs');

exports.adminSignUp = (req, res) => {
    const email = req.body.email;
    User.findOne(
        { email: email }, (err, user) => {
            if (err)
                res.status(STATUSCODE.INTERNALSERVERERROR.code).json(
                    {
                        message: err.message
                    }
                );
            else {
                if (user) {
                    res.status(STATUSCODE.CONFLIT.code).json(
                        {
                            message: STATUSCODE.CONFLIT.message
                        }
                    );
                } else {
                    const adminCode = randomString(35);
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const msg = {
                        to: email,
                        from: 'baruka99.david@gmail.com', //the email address or domain you verified above
                        subject: 'Mot de passe compte admin L1000pay',
                        text: "Voici votre mot de passe admin: " + adminCode,
                        html: "Voici votre mot de passe admin: " + adminCode,
                    };

                    // sending the code to the admin and then save the admin

                    sgMail
                        .send(msg)
                        .then(
                            (_) => {
                                bcrypt.genSalt(
                                    10,
                                    function (err, salt) {
                                        if (err) {
                                            res.status(500).json({
                                                message: err.message
                                            });
                                        } else {
                                            bcrypt.hash(adminCode, salt, function (err, hash) {
                                                if (err) {
                                                    res.status(500).json({
                                                        message: err.message
                                                    });
                                                } else {
                                                    const user = User({
                                                        _id: new mongoose.Types.ObjectId,
                                                        email: email,
                                                        createdAt: Date.now()
                                                    });
                                                    user.save()
                                                        .then((savedUser) => {

                                                            const creadential = Credential(
                                                                {
                                                                    _id: new mongoose.Types.ObjectId,
                                                                    username: email,
                                                                    password: hash,
                                                                    user: savedUser,
                                                                    role: "admin",
                                                                    createdAt: Date.now()
                                                                }
                                                            );
                                                            creadential.save()
                                                                .then(_ => {
                                                                    res.status(201).json({
                                                                        message: "L'administrateur a été bien enrégistré",
                                                                    });
                                                                })

                                                        })
                                                        .catch(
                                                            err => {
                                                                res.status(500).json({
                                                                    message: err.message
                                                                })

                                                            }
                                                        );
                                                }
                                            })
                                        }

                                    }
                                )
                            }
                        )
                        .catch(
                            err => {
                                res.status(STATUSCODE.INTERNALSERVERERROR.code).json(
                                    {
                                        message: err.message
                                    }
                                );
                            }
                        )

                }
            }
        }
    );
}


// notice: in the login part the client must tel us the ressource that the end user looks for