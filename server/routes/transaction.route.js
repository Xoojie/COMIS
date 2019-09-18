const express = require('express');
const app = express();
const transactionRoute = express.Router();

let Transcation = require('../model/transaction');

//get all
transactionRoute.route('/').get((req, res) => {
    Transcation.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
// get one
transactionRoute.route('/get/id=:id').get((req, res) => {
    Transcation.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// add
transactionRoute.route('/post').post((req, res, next) => {
    Transcation.create(req.body, (error, data) => {
      if (error) {
        console.log("error in inv add");
        return next(error)
      } else {
        res.json(data)
      }
    })
});
//update
transactionRoute.route('/update/:id').put((req, res, next) => {
    Transcation.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})
//getLatest
transactionRoute.route('/getLatest/id=:id').get((req, res) => {
    Transcation.findOne({ itemID: req.params.id },{},{ sort: { dateBorrowed : -1 } }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})




module.exports = transactionRoute;