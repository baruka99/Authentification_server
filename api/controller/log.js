const Log = require('../models/log')

exports.find = async (req, res) => {
    try {
        const logs = await Log.find();
        res.status(200).json({ logs })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}