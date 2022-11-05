const { Client } = require('../models/client')
const { Credential } = require('../models/creadential')


function isAllowed(req, res, next) {
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


function isAdmin(req, res, next) {
    const token = req.headers.authorization.split(" ")[1]
    Credential.findOne(
        {
            token: {
                access: token
            }
        }, (err, admin) => {
            if (err)
                res.status(500).json(
                    {
                        message: err.message
                    }
                );
            if (admin != null && admin.role === "admin") {
                res.locals.admin = admin
                next();
            }
            res.status(403).json();

        }
    ).populate("user")
}

exports.module = {
    isAllowed,
    isAdmin
}