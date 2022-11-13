const Client = require('../models/client')
const Credential = require('../models/creadential')


exports.isAllowed = async (req, res, next) => {

    // we will give to the client access if this one has respected those three conditions
    // 1. he is the client
    // 2. he has the full information about the ressourse he want to be redirect to
    const { client, ressource } = req.params; // those are keys

    try {
        const resultClient = await Client.findOne({ key: client })
        const resultRessource = await Client.findOne({ key: ressource })
        if (resultClient && resultRessource) {

            /* 
            let check now if the client is suscribed to the ressource his want to 
            achieve
            */

            let match = false;
            for (let i = 0; i < resultClient.subscribeTo.length; i++) {
                if (resultClient.subscribeTo[i] == resultRessource.key) {
                    match = true
                    break;
                }
            }

            if (match) next();
            else res.status(403).json();

        } else {
            res.status(403).json();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.isAdmin = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) res.status(403).json();

    try {
        const admin = await Credential.findOne({ token: { refresh: token } }).populate("user")

        if (admin && admin.role === "admin") {
            res.locals.admin = admin
            next();
        }
        else {
            res.status(403).json();
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}
