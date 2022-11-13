const express = require('express');
const route = express.Router();
const permission = require('../configs/permission')
const user = require('../controller/user')
const client = require('../controller/client')


// *** END USERS ***

// Admin
route.post('/auth/admin/super', user.sAdminSignUp)
route.post('/login/admin/super', user.sAdminLogin)


// Client app
route.post('/client/register', permission.isAdmin, client.registerClient)
route.get('/clients', permission.isAdmin, client.findClient)
route.get('/client/:key', permission.isAdmin, client.oneClient)


//common user route
route.post('/auth/token/', user.getToken)


route.get("/", (req, res) => {
    // console.log(req.headers);
    res.status(200).json({
        headers: req.headers,
        message: "Welcome to the Account L1000 Services server"
    });
})

route.post("/cspreport", (req, res) => {
    console.log(req.body);
})

module.exports = route