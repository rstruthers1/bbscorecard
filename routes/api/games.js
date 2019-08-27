const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');

// @route GET api/games
// @desc Test route
// @access Public
router.get('/', (req, res) => res.send('Games route'));

// @route POST api/games
// @desc Create a game
// @access Private
router.post('/',
    [auth,
      //https://github.com/validatorjs/validator.js/blob/2f6208486a0e149d44e88a4f89deddb901663ee4/test/validators.js#L6171
      [
          check('gameDateTime', 'Invalid game date and time').isISO8601(),
          check('homeTeam', 'You must select a home team').not().isEmpty(),
          check('visitingTeam', 'You must select a visiting team')
          .isLength({min: 1})
          .custom((value, {req, loc, path}) => {
            if (value === req.body.homeTeam) {
              throw new Error("The home team and visiting team must be different")
            } else {
              return value;
            }
          })
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array({onlyFirstError: true}) });
      }

      res.send('Create a game route')

});

module.exports = router;
