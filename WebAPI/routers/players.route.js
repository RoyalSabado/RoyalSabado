const express = require('express');
const playerRoute = express.Router();

// Player model
let PlayerModel = require('../models/players');
let suffix = '/players/'
playerRoute.route(suffix + 'get').get((req, res) => {
    PlayerModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

 playerRoute.route(suffix + 'create').post((req, res, next) => {
    PlayerModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

playerRoute.route(suffix + 'edit/:id').get((req, res) => {
   PlayerModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update player
playerRoute.route(suffix + 'update/:id').post((req, res, next) => {
  PlayerModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Student successfully updated!')
    }
  })
})

// Delete player
playerRoute.route(suffix + 'delete/:id').delete((req, res, next) => {
  PlayerModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = playerRoute;