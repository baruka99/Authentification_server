const { Client } = require('../api/models/client')
const { STATUSCODE, ROLE } = require('./data')
const { Credential } = require('../api/models/creadential')


function isAllowed(req, res, next) {
    // we will give to the client access if this one has respected those three conditions
    // 1. he is the client
    // 2. he has the full information about the ressourse he want to be redirect to
    const { clientKey, ressourceKey } = req.params;
    Client.findOne(
        { key: clientKey },
        (err, client) => {
            if (err) {
                res.status(STATUSCODE.INTERNALSERVERERROR.code).json(
                    {
                        message: STATUSCODE.INTERNALSERVERERROR.message
                    }
                );
            } else {
                if (client != null) {
                    Client.findOne(
                        { key: ressourceKey },
                        (err, ressource) => {
                            if (err) {
                                res.status(STATUSCODE.INTERNALSERVERERROR.code).json(
                                    {
                                        message: STATUSCODE.INTERNALSERVERERROR.message
                                    }
                                );
                            } else {
                                if (ressource != null) {
                                    next();
                                } else {
                                    res.status(STATUSCODE.UNAUTHORIZED.code).json();
                                }
                            }
                        }
                    )
                } else {
                    res.status(STATUSCODE.UNAUTHORIZED.code).json();
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
                res.status(STATUSCODE.INTERNALSERVERERROR.code).json(
                    {
                        message: STATUSCODE.INTERNALSERVERERROR.message
                    }
                );
            if (admin != null && admin.role === ROLE.ADMIN) next();
            res.status(STATUSCODE.UNAUTHORIZED.code).json();

        }
    ).populate("user")
}

exports.module = {
    isAllowed,
    isAdmin
}