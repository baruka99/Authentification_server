// The client can be one of the l1000 services application or 
// The other extern part
// this one must have such a authorization to access to the a L1000 service

const mongoose = require('mongoose')
const sgMail = require('@sendgrid/mail');
const Client = require('../models/client')
const { randomString, sha256 } = require('../shared/utils.js');
const mailSender = require('../shared/mail');
const client = require('../models/client');

/* 
consult the doc for more information about
this section

Note that: only the super admin has the privilege of 
           registering the client application
*/

function clientDataModel(data) {

    return {

        owner: data.owner,
        description: data.description,
        subscribeTo: data.subscribeTo,
        redirectUrl: data.redirectUrl,
        key: data.key,

    }
}

exports.registerClient = async (req, res) => {
    const { owner, description, subscribeTo, redirectUrl } = req.body;
    console.log(owner.name)
    try {
        const client = await Client.findOne({ "owner.name": owner.name })
        if (client) {
            res.status(409).json({
                message: "Conflit, exist" // this will be removed in production 
            })
        } else {
            // configuring the key
            const clientKey = sha256(randomString())
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);

            const msg = {
                to: owner.adminMail,
                from: 'contact.upperz@gmail.com', //the email address or domain you verified above
                subject: 'Clé client L1000 services',
                text: "Voici votre clé client: " + clientKey,
                html: clientKey,
            };

            //sending mail
            await sgMail.send(msg)

            const client = new Client({
                _id: new mongoose.Types.ObjectId,
                owner, description, subscribeTo, redirectUrl, addedAt: Date.now(), key: clientKey,
            });

            //saving client
            await client.save()

            res.status(201).json({
                message: "Le client a été enrégistré avec succès"
            })

        }
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
}


exports.update = async (req, res) => {
    const key = req.params.key
    const { owner, description, subscribeTo, redirectUrl, } = req.body
    const upadate = { owner, description, subscribeTo, redirectUrl }

    Object.keys(upadate).forEach(key => {
        if (upadate[key] === undefined) {
            delete upadate[key];
        }
    });
    try {
        await Client.findOneAndUpdate({ "key": key }, upadate);
        updatedClient = await Client.findOne({ "key": key });

        res.status(201).json({
            message: "Opération effectuée avec succès",
            client: clientDataModel(updatedClient),
        })
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
}


exports.find = async (req, res) => {
    try {

        const clients = await Client.find();
        responseClient = [];
        clients.forEach(c => { responseClient.push(clientDataModel(c)); });
        res.status(200).json({ clients: responseClient })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


exports.findOne = async (req, res) => {
    const key = req.params.key;
    try {
        const client = await Client.findOne({ key });
        res.status(200).json({ client: clientDataModel(client) })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}