const mongoose = require('mongoose')
const User = require('../models/user_model');
const Credential = require('../models/creadential')
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcryptjs');
const { randomString, sha256 } = require('../shared/utils.js');
const jwt = require('jsonwebtoken')

exports.adminSignUp = (req, res) => {
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

exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    const adminCredential = await Credential.find({ username }).populate('user');

    if (!admin) res.status(409).json({
        message: "Identifiants incorrect"
    })

    const isPasswordCorrect = await bcrypt.compare(password, adminCredential.password);
    if (isPasswordCorrect) {
        const refreshToken = jwt.sign(
            {
                userId: adminCredential.user._id,
            },
            'secret',
            {
                expiresIn: "360d"
            }
        );
        adminCredential.token.refresh = refreshToken;
        adminCredential.save()
            .then(
                (_) => res.status(200).json({
                    message: "Vous avez été bien connecté",
                    credential: adminCredential._id,
                })
            )
            .catch(
                err => res.status(500).json(
                    {
                        message: err.message
                    }
                )
            );
    } else {
        res.status(409).json({
            message: "Identifiants incorrect"
        })
    }

}


exports.getToken = (req, res) => {
    const credentialId = req.params.creadentialId;
}

// notice: in the login part the client must tel us the ressource that the end user looks for






