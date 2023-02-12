const mongoose = require('mongoose');


/*
    IMPORTANT ELEMENTS

    1. METHODE
    2. ORIGINAL URL
    3. URL
    
*/

module.exports = mongoose.model('Log', mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    statusCode: Number,
    methode: String,
    url: {
        url: String,
        base: String,
        originalUrl: String,
    },
    clientAddress: String,
    header: {
        rowHeaders: [String],
        Headers: Object,
        query: Object,
        params: Object,
    },
    body: Object,
    client: {
        typeClient: String,
        key: String,
    },
    times: {
        startTime: Date,
        addedAt: {
            type: Date,
            default: Date.now
        }
    }
}))