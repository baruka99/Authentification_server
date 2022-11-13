const { Client } = require('../models/client')
const Credential = require('../models/creadential')


exports.isAllowed = (req, res, next) => {

    // we will give to the client access if this one has respected those three conditions
    // 1. he is the client
    // 2. he has the full information about the ressourse he want to be redirect to

    const { clientKey, ressourceKey } = req.params;
    Client.findOne(
        { key: clientKey },
        (err, client) => {
            if (err) {
                res.status(500).json(
                    {
                        message: err.message
                    }
                );
            } else {
                if (client) {
                    Client.findOne(
                        { key: ressourceKey },
                        (err, ressource) => {
                            if (err) {
                                res.status(500).json(
                                    {
                                        message: err.message
                                    }
                                );
                            } else {
                                if (ressource) {
                                    next();
                                } else {
                                    res.status(403).json();
                                }
                            }
                        }
                    )
                } else {
                    res.status(403).json();
                }
            }

        }
    )

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
