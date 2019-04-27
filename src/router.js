const express = require('express');
const chalk = require('chalk');
const auth = require('./middleware/auth.js');
const router = new express.Router();

router.get('/', auth, async (req,res) => {
    return res.send("you are passed the authentication");
});


module.exports = router;