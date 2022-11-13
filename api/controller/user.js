const mongoose = require('mongoose')
const User = require('../models/user_model');
const Credential = require('../models/creadential')
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcryptjs');
const { randomString, sha256 } = require('../shared/utils.js');
const jwt = require('jsonwebtoken')
const mailSender = require('../shared/mail')

exports.sAdminSignUp = (req, res) => {
    const email = req.body.email;
    User.findOne(
        { email: email }, (err, user) => {
            if (err)
                res.status(500).json(
                    {
                        message: err.message
                    }
                );
            else {
                if (user) {
                    res.status(409).json(
                        {
                            message: "Une erreur s'est produite"
                        }
                    );
                } else {

                    let adminCode = sha256(randomString());
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const msg = {
                        to: email,
                        from: 'contact.upperz@gmail.com', //the email address or domain you verified above
                        subject: 'Mot de passe compte admin L1000pay',
                        text: "Voici votre mot de passe admin: " + adminCode,
                        html: adminCode,
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
                                res.status(500).json(
                                    {
                                        message: err
                                    }
                                );
                            }
                        )

                }
            }
        }
    );
}

// LOGIN ADMIN
exports.sAdminLogin = async (req, res) => {
    const { username, password } = req.body;
    const adminCredential = await Credential.findOne({ username }).populate('user');

    if (!adminCredential) res.status(409).json({
        message: "Identifiants incorrect"
    })

    bcrypt.compare(
        password, adminCredential.password, function (err, isCorrect) {
            if (err) res.status(500).json({
                message: err.message
            })
            if (isCorrect) {
                const refreshToken = jwt.sign(
                    {
                        userId: adminCredential.user._id,
                    },
                    'secret',
                    {
                        expiresIn: "360d"
                    }
                );
                const creadential = randomString()
                adminCredential.token.refresh = refreshToken;
                adminCredential.otpCode = sha256(creadential);
                adminCredential.save()
                    .then(
                        (cred) => {
                            console.log(creadential._id)
                            res.status(200).json({
                                message: "Vous avez été bien connecté",
                                credId: {
                                    id: cred._id,
                                    value: creadential
                                },

                            })
                        }
                    )
                    .catch(
                        err => res.status(500).json(
                            {
                                message: err.message
                            }
                        )
                    );
            }

            else {
                res.status(409).json({
                    message: "Identifiants incorrect"
                })
            }
        }
    );

}


exports.getToken = async (req, res) => {
    const { credId, value } = req.body;
    console.log(req.body)
    try {
        const credential = await Credential.findById(credId).populate('user');
        console.log(credential);
        if (!credential || credential.otpCode != sha256(value)) res.status(409).json({
            message: "Identifiants incorrect"
        })
        res.status(200).json({
            token: credential.token.refresh,
            user: {
                email: credential.user.email,
                phone: credential.user.phone,
                createdAt: credential.user.createdAt,
                firstName: credential.user.firstName,
                lastName: credential.user.lastName,
            },
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}

// notice: in the login part the client must tel us the ressource that the end user looks for






