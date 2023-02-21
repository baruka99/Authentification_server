const express = require('express');
const route = express.Router();
const permission = require('../configs/permission')
const user = require('../controller/user')
const log = require('../controller/log')
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
route.post('/user/signup/:client/:ressource', permission.isAllowed, user.userSignUp)
route.post('/user/login/:client/:ressource', permission.isAllowed, user.userlogin)

// *** COMMON ROUTES ***
route.get('/auth/token/:cred', user.getToken)
route.get('/auth/tokenres/', user.getResourceToken)

// ressource server part

route.get('/ressource/user', user.getUserInfo)


route.get("/", (req, res) => {
    console.log(req.originalUrl)

    res.status(200).json({
        headers: req.headers,
        message: "Welcome to the Account Services server"
    });
})

route.get("/logreport", permission.isAdmin, log.find)

module.exports = route