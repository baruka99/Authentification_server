const mongoose = require('mongoose');

module.exports = mongoose.model("Client", mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // the designation of a client
    owner: {
        name: String,
        adminMail: String, // the mail the admin/CTO, etc
        enterprise: String, // this section will be null if the client is an interne client
        isInterne: {
            type: Boolean,
            default: false
        },
        // in the scenario that the ressource is adding
        isRessource: {
            type: Boolean,
            default: false
        },
    },
    description: String,
    redirectUrl: String, // the url to redirect after authentifiate the user
    key: String,
    addedAt: {
        type: Date,
        default: Date.now
    }
}))