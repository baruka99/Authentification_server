// NOTCE: For this first version the Admin of the L1000 pay will have the privilege of 
// authentifiate the client (application) in the platform

const ROLE = {
    ADMIN: "admin",
    BASIC: "basic",
    USER: "user",
    AGENT: "agent",
    DRIVER: "driver"
}


const STATUSCODE = {
    INTERNALSERVERERROR: { code: 500, message: "Une erreur s'est produite" },
    SUCCESS: { code: 200, message: "Términée avec succès" },
    UPDATED: { code: 201, message: "Inserée avec succès" },
    UNAUTHORIZED: 403,
    CONFLIT: { code: 403, message: "Une erreur s'est produite" },
    NOTFOUND: 404,
    BADREQUEST: 400
}

