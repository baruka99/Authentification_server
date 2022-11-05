// The client can be one of the l1000 services application or 
// The other extern part
// this one must have such a authorization to access to the a L1000 service

const mongoose = require('mongoose')
const User = require('../models/user_model');
const Credential = require('../models/creadential')
const sgMail = require('@sendgrid/mail');
const Client = require('../models/client')
const { randomString, sha256 } = require('../shared/utils.js');

exports.registerClient = (req, res) => {
    const { } = req.body;
    const admin = res.admin;

    Client.find(

    );

}
