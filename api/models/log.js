const mongoose = require('mongoose');


/*
    IMPORTANT ELEMENTS

    1. METHODE
    2. ORIGINAL URL
    3. URL
    
*/

module.exports = mongoose.model('Log', mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: String,
    status: Number,
    count: {
        type: Number,
        default: 0
    },
    header: {
        ipAddress: String,
    },
    client: {
        typeClient: String,
        key: String,
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
}))