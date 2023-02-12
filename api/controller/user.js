const mongoose = require('mongoose')
const User = require('../models/user_model');
const Credential = require('../models/creadential')
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcryptjs');
const { randomString, sha256 } = require('../shared/utils.js');
const jwt = require('jsonwebtoken')
const { mail, clientMail } = require('../shared/mail')

exports.sAdminSignUp = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({ email: email })
        if (user) res.status(409).json({ message: "Une erreur s'est produite" });
        else {

            let adminCode = sha256(randomString());
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: email,
                from: 'contact.upperz@gmail.com', //the email address or domain you verified above
                subject: 'Mot de passe compte admin',
                html: mail(adminCode, email),
            };
            await sgMail.send(msg)
            const salt = await bcrypt.genSalt(10)
            const cryptPass = await bcrypt.hash(adminCode, salt);
            const newUser = User({
                _id: new mongoose.Types.ObjectId,
                email: email,
                createdAt: Date.now()
            });
            await newUser.save()
            const creadential = Credential(
                {
                    _id: new mongoose.Types.ObjectId,
                    username: email,
                    password: cryptPass,
                    user: newUser,
                    role: "as super admin",
                    createdAt: Date.now()
                }
            );
            await creadential.save()
            res.status(201).json({
                message: "L'administrateur a été bien enrégistré",
            });

        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}

// LOGIN ADMIN
exports.sAdminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const adminCredential = await Credential.findOne({ username }).populate('user');


        if (!adminCredential) res.status(409).json({
            message: "Identifiants incorrect"
        })

        const checkPwd = await bcrypt.compare(password, adminCredential.password)
        if (!checkPwd) res.status(409).json({ message: "Identifiants incorrect" })
        else {
            const refreshToken = jwt.sign({ userId: adminCredential.user._id, }, 'secret', { expiresIn: "360d" });
            const creadential = randomString()
            adminCredential.token.refresh = refreshToken;
            adminCredential.otpCode = sha256(creadential);
            await adminCredential.save()
            res.status(200).json({
                cred: adminCredential.otpCode,
            })
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}


/*

END USER PART
=============

*/

exports.userSignUp = async (req, res) => {
    const { firstName, lastName, email, phone, password, role } = req.body;
    const fullNumber = phone.code + phone.number;
    try {

        const cred = await Credential.findOne({ $or: [{ username: email, }, { username: fullNumber }] });
        if (cred || role == 'as super admin') res.status(409).json({ message: "Conflit" })
        else {

            /* 
              apart from the basic user, all other user will be 
              signed up in the same way, like the driver, admin and agent
              for this first version we have only the  client and the  
              ressource server
            */
            const newUser = User({
                _id: new mongoose.Types.ObjectId,
                firstName, lastName, email, phone
            })

            await newUser.save();

            // let crypt the password
            const genPwd = sha256(randomString()); // for the user with other role than the basic role
            const salt = await bcrypt.genSalt(10)
            const cryptPass = await bcrypt.hash(role == 'basic' ? password : genPwd, salt);

            const creadential = Credential(
                {
                    _id: new mongoose.Types.ObjectId,
                    role, password: cryptPass,
                    user: newUser,
                    username: role == 'basic' ? fullNumber : email
                }
            )

            if (role != 'basic') {
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                    to: email,
                    from: 'contact.upperz@gmail.com', //the email address or domain you verified above
                    subject: 'Mot de passe compte',
                    text: mailSender(genPwd),
                    html: mailSender(genPwd),
                };
                await sgMail.send(msg)
            }

            await creadential.save();

            res.status(201).json({
                message: "L'utilisateur a été enrégistré avec succès"
            })
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.userlogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const credential = await Credential.findOne({ username });
        if (!credential) res.status(409).json({ message: "Identifiants incorrect" })
        else {
            const checkPwd = await bcrypt.compare(password, credential.password)
            if (!checkPwd) res.status(409).json({ message: "Identifiants incorrect" })
            else {
                credential.otpCode = sha256(randomString());
                await credential.save()
                res.status(200).json({
                    cred: credential.otpCode,
                })
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getToken = async (req, res) => {
    const cred = req.params.cred;
    try {
        const credential = await Credential.findOne({ otpCode: cred }).populate('user');
        if (!credential) res.status(409).json({ message: "Identifiant incorrect" })
        credential.otpCode = undefined;
        await credential.save();
        res.status(200).json({
            message: "Vous avez été bien connecté",
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






