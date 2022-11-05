const express = require('express');
const route = express.Router();

const user = require('../controller/user')


// *** END USERS ***

// Admin
route.post('/auth/admin/super', user.sAdminSignUp)
route.post('/login/admin/super', user.sAdminLogin)



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