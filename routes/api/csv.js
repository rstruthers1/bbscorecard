const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');
var multer  = require('multer')
const fs = require('fs');
var upload = multer({ dest: '.' })

// @route    POST api/users/avatar
// @desc     Set user avatar
// @access   private
router.post('/',  upload.single("foo"), async (req, res) => {
  try {
    let lines = fs.readFileSync(req.file.path).toString().split('\n');
    for (let i = 0; i < lines.length; i++) {
      console.log(lines[i])
    }

    res.json({msg: "success"});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({errors: [{msg: 'Server error'}]});
  }
});

module.exports = router;
