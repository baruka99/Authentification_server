const User = require('../models/user_model');
const { STATUSCODE } = require('../configs/data')
const sgMail = require('@sendgrid/mail');
const { randomString } = require('../shared/utils')

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
                    const adminCode = randomString(75);
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
                            (sent) => {

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