const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');
const Season = require('../../models/Season');
const League = require('../../models/League');

// @route POST api/seasons
// @desc Add a season
// @access Private
router.post('/',
    [
      auth,
      [
        check('name', 'Name is required').not().isEmpty(),
        check('startDate', 'Invalid start date').isISO8601(),
        check('endDate', 'Invalid end date').isISO8601(),
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array({onlyFirstError: true})
        });
      }

      const {name, startDate, endDate} = req.body;
      try {
        const newSeason = new Season({
          name, startDate: startDate, endDate,
            owner: req.user.id
        });
        const season = await newSeason.save();
        res.json(season);
      } catch (err) {
        console.error(err.message);
        res.status(500).send({errors: [{msg: err.message}]});
      }

    });

// @route PUT api/seasons/:id
// @desc Update a season
// @access Private
router.put('/:id',
    [
      auth,
      [
        check('name', 'Name is required').not().isEmpty(),
        check('startDate', 'Invalid start date').isISO8601(),
        check('endDate', 'Invalid end date').isISO8601(),
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array({onlyFirstError: true})
        });
      }

      const {name, startDate, endDate} = req.body;
      try {
        let season = await Season.findOne({owner : req.user.id, _id: req.params.id});
        console.log("**season: " + JSON.stringify(season));
        season.name = name;
        season.startDate = startDate;
        season.endDate = endDate;
        await season.save();
        res.json(season);
      } catch (err) {
        console.error(err.message);
        res.status(500).send({errors: [{msg: err.message}]});
      }

    });

// @route GET api/seasons/:id
// @desc Get a season
// @access Private
router.get('/:id',
    auth,
    async (req, res) => {
      try {
        const season = await Season.findById(req.params.id);
        console.log("season: " + JSON.stringify(season));
        console.log("req.user.id: " + req.user.id);
        console.log("season.owner: " + season.owner)
        if (season.owner != req.user.id) {
          return res.status(401).json({
            errors: [{msg: 'Access denied'}]
          });
        }
        res.json(season);
      } catch (err) {
        console.error(err.message);
        res.status(500).send({errors: [{msg: err.message}]});
      }
    });

// @route GET api/seasons
// @desc Get seasons for logged in user
// @access Private
router.get('/',
    auth,
    async (req, res) => {
      try {
        const seasons = await Season.find({"owner": req.user.id});
        console.log("seasons: " + JSON.stringify(seasons));

        res.json(seasons);
      } catch (err) {
        console.error(err.message);
        res.status(500).send({errors: [{msg: err.message}]});
      }
    });

// @route POST api/seasons/:id/leagues
// @desc Add a league to a season
// @access Private
router.post('/:id/leagues',
    [
      auth,
      [
        check('name', 'Name is required').not().isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array({onlyFirstError: true})
        });
      }

      const {name} = req.body;
      try {
        const season = await Season.findById(req.params.id);
        if (!season) {
          return res.status(404).send({errors: [{msg: `season with id ${req.params.id} not found`}]});
        }
        const newLeague = new League( {
          name: name,
          seasonId: req.params.id,
          owner: req.user.id
        });

        const league = await newLeague.save();

        if (!season.leagues) {
          season.leagues = [];
        }

        season.leagues.push(league._id);
        await season.save();

        res.json(league);
      } catch (err) {
        console.error(err.message);
        res.status(500).send({errors: [{msg: err.message}]});
      }
    });


// @route GET api/seasons/:id/leagues
// @desc Get leagues for season
// @access Private
router.get('/:id/leagues',
    auth,
    async (req, res) => {
      try {
        const season = await Season.findById(req.params.id)
        .populate({
          path: 'leagues',
          select: ['name']
        });
        console.log("season: " + JSON.stringify(season));
        res.json(season);
      } catch (err) {
        console.error(err.message);
        res.status(500).send({errors: [{msg: err.message}]});
      }
    });



module.exports = router;
