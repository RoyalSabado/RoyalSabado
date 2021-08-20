const express = require('express');
const desafioRoute = express.Router();

// Desafio model
let DesafioModel = require('../models/desafios');
let suffix = '/desafios/'
desafioRoute.route(suffix + 'get').get((req, res) => {
    DesafioModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

 desafioRoute.route(suffix + 'create').post((req, res, next) => {
    DesafioModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

desafioRoute.route(suffix + 'edit/:id').get((req, res) => {
   DesafioModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update desafio
desafioRoute.route(suffix + 'update/:id').post((req, res, next) => {
  DesafioModel.findByIdAndUpdate(req.params.id, {
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

// Delete desafio
desafioRoute.route(suffix + 'delete/:id').delete((req, res, next) => {
  DesafioModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = desafioRoute;