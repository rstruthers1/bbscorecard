const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');
const League = require('../../models/League');
const Season = require('../../models/Season');



module.exports = router;
