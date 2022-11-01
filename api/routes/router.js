const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcom to the Account L1000 Services server"
    });
})