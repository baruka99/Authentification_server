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
}))