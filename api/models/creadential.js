const mongoose = require('mongoose');

module.exports = mongoose.model("Credential", mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String,
    password: String,
    otpCode: String,
    token: {
        refresh: String,
        access: String,
        ressource: String,
    },
    role: String, // BASIC,AS USER ADMIN,USER,AGENT,DRIVER
    // this is the hash funchtion, we may take the date of today to hash or an
    //after saving and giving to the user the access to the ressource server, this one will be deleted
}))