const express = require('express');
const app = express();
const incidentRoute = express.Router();

let Incident = require('../model/incident');

//get all
incidentRoute.route('/').get((req, res) => {
    Incident.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
// get one
incidentRoute.route('/get/id=:id').get((req, res) => {
    Incident.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// add
incidentRoute.route('/post').post((req, res, next) => {
    Incident.create(req.body, (error, data) => {
      if (error) {
        console.log("error in inv add");
        return next(error)
      } else {
        res.json(data)
      }
    })
});
//update
incidentRoute.route('/update/:id').put((req, res, next) => {
    Incident.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})
// get by tID
incidentRoute.route('/getByTID/id=:id').get((req, res) => {
    Incident.findOne({ tID: req.params.id },{},{}, (error, data) => {
if (error) {
  return next(error)
} else {
  res.json(data)
}
})
})
//get by borrower
incidentRoute.route('/getByBorrower/id=:id').get((req, res) => {
  Incident.find({ bID: req.params.id },{},{ sort: { date : -1 } }, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})
//delete
incidentRoute.route('/delete/:id').delete((req, res, next) => {
    Incident.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })


module.exports = incidentRoute;