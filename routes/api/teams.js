const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');
const Team = require('../../models/Team');

// @route GET api/teams
// @desc Get teams
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const teams = await Team.find({});
    console.log(teams);
    res.json(teams);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({errors: [{ msg: 'Server error'}]});
  }
});

// @route POST api/teams
// @desc Create a team
// @access Private
router.post('/',
    [
      auth,
      [
        check('name', 'Name is required').not().isEmpty(),
        check('city', 'City is required').not().isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array({onlyFirstError: true})
        });
      }

      const {name, city, state, stadium} = req.body;
      try {
        const newTeam = new Team({
          name, city, state, stadium
        });
        const team = await newTeam.save();
        res.json(team);
      } catch (err) {
        console.error(err.message);
        res.status(500).send({errors: [{msg: err.message}]});
      }

    });

// @route PUT api/teams/:id
// @desc Edit a team
// @access Private
router.put('/:id',
    [
      auth,
      [
        check('name', 'Name is required').not().isEmpty(),
        check('city', 'City is required').not().isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array({onlyFirstError: true})
        });
      }

      const {name, city, state, stadium} = req.body;

      try {
        let team = await Team.findById(req.params.id).select();
        team.name = name;
        team.city = city;
        team.state = state;
        team.stadium = stadium;

        team = await team.save();
        res.json(team);
      } catch (err) {
        console.error(err.message);
        res.status(500).send({errors: [{msg: err.message}]});
      }

    });

// @route GET api/teams/:id
// @desc View a team
// @access Private
router.get('/:id',
      auth,
    async (req, res) => {
      try {
        const team = await Team.findById(req.params.id).select();
        res.json(team);
      } catch (err) {
        console.error(err.message);
        res.status(500).send({errors: [{msg: err.message}]});
      }
    });

module.exports = router;
