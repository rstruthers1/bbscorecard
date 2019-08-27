const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');
const Player = require('../../models/Player');

// @route POST api/players
// @desc Add a player
// @access Private
router.post('/',
    [
      auth,
      [
        check('firstName', 'First Name is required').not().isEmpty(),
        check('lastName', 'Last Name is required').not().isEmpty(),
        check('dateOfBirth', 'Invalid date of birth').isISO8601(),
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array({onlyFirstError: true})
        });
      }

      const {firstName, lastName, dateOfBirth} = req.body;
      try {
        const newPlayer = new Player({
          firstName, lastName, dateOfBirth
        });
        newPlayer.owner = req.user.id;
        const player = await newPlayer.save();
        res.json(player);
      } catch (err) {
        console.error(err.message);
        res.status(500).send({errors: [{msg: err.message}]});
      }

    });

// @route PUT api/players/:id
// @desc Update a player
// @access Private
router.put('/:id',
    [
      auth,
      [
        check('firstName', 'First Name is required').not().isEmpty(),
        check('lastName', 'Last Name is required').not().isEmpty(),
        check('dateOfBirth', 'Invalid date of birth').isISO8601(),
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array({onlyFirstError: true})
        });
      }

      const {firstName, lastName, dateOfBirth} = req.body;
      try {
        let player = await Player.findOne({owner : req.user.id, _id: req.params.id});
        console.log("**player: " + JSON.stringify(player));
        player.firstName = firstName;
        player.lastName = lastName;
        player.dateOfBirth = dateOfBirth;
        await player.save();
        res.json(player);
      } catch (err) {
        console.error(err.message);
        res.status(500).send({errors: [{msg: err.message}]});
      }

    });

// @route GET api/players/:id
// @desc Get a player
// @access Private
router.get('/:id',
    auth,
    async (req, res) => {
      try {
        console.log("*** get player by id");
        const player = await Player.findById(req.params.id);
        console.log("player: " + JSON.stringify(player));
        console.log("req.user.id: " + req.user.id);

        if (player.owner != req.user.id) {
          return res.status(401).json({
            errors: [{msg: 'Access denied'}]
          });
        }
        res.json(player);
      } catch (err) {
        console.error(err.message);
        res.status(500).send({errors: [{msg: err.message}]});
      }
    });

// @route GET api/players
// @desc Get players for logged in user
// @access Private
router.get('/',
    auth,
    async (req, res) => {
      try {
        const players = await Player.find({"owner": req.user.id});
        console.log("players: " + JSON.stringify(players));

        res.json(players);
      } catch (err) {
        console.error(err.message);
        res.status(500).send({errors: [{msg: err.message}]});
      }
    });

module.exports = router;
