const express = require('express');
const route = express.Router();
const permission = require('../configs/permission')
const user = require('../controller/user')
const client = require('../controller/client')


// *** SUPER ADMIN ***
route.post('/auth/admin/super', user.sAdminSignUp)
route.post('/login/admin/super', user.sAdminLogin)


// *** CLIENT APPLICATION ***
route.post('/client/register', permission.isAdmin, client.registerClient)
route.get('/clients', permission.isAdmin, client.find)
route.get('/client/:key', permission.isAdmin, client.findOne)
route.put('/client/:key', permission.isAdmin, client.update)

// *** END USERS ***
route.post('/user/auth/:client/:ressource', permission.isAllowed, user.userSignUp)

// *** COMMON ROUTES ***
route.get('/auth/token/:cred', user.getToken)


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