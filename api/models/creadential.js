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
    },
    role: String, // BASIC,ADMIN,USER,AGENT,DRIVER
    function: {
        a: String,
        b: String,
    },
    // this is the hash funchtion, we may take the date of today to hash or an
    //after saving and giving to the user the access to the ressource server, this one will be deleted
    hash: String // the response hash that the ressource server will take to see if the user is the one who has been 
    // authentified, after saving and giving to the user the access to the ressource server, this one will be deleted
}))