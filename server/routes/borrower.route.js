const express = require('express');
const app = express();
const borrowerRoute = express.Router();

let Borrower = require('../model/borrower');

//get all
borrowerRoute.route('/').get((req, res) => {
    Borrower.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
// get one
borrowerRoute.route('/get/id=:id').get((req, res) => {
    Borrower.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// add
borrowerRoute.route('/post').post((req, res, next) => {
    Borrower.create(req.body, (error, data) => {
      if (error) {
        console.log("error in inv add");
        return next(error)
      } else {
        res.json(data)
      }
    })
});
//update
borrowerRoute.route('/update/:id').put((req, res, next) => {
    Borrower.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})
//get by borrower
//get by borrower
borrowerRoute.route('/getByBorrower/id=:id').get((req, res) => {
  Borrower.findOne({ bID: req.params.id },{},{}, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})
//delete
borrowerRoute.route('/delete/:id').delete((req, res, next) => {
    Borrower.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
})



module.exports = borrowerRoute;