const mongoose = require('mongoose');


module.exports = mongoose.model('Log', mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: String,
    status: Number,
    header: {
        ipAddress: String,

    },
    client: {
        typeClient: String,
        key: String,
    }
}))