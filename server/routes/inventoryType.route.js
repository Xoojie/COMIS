const express = require('express');
const app = express();
const inventoryTypeRoute = express.Router();

let InventoryType = require('../model/inventoryType');

//get all
inventoryTypeRoute.route('/').get((req, res) => {
    InventoryType.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
// get one
inventoryTypeRoute.route('/get/id=:id').get((req, res) => {
    InventoryType.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// add
inventoryTypeRoute.route('/post').post((req, res, next) => {
    InventoryType.create(req.body, (error, data) => {
      if (error) {
        console.log("error in inv add");
        return next(error)
      } else {
        res.json(data)
      }
    })
});
//update
inventoryTypeRoute.route('/update/:id').put((req, res, next) => {
    InventoryType.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})
//get by class
inventoryTypeRoute.route('/get/class=:class').get((req, res) => {
    InventoryType.find({ class: req.params.class },{},{}, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})

module.exports = inventoryTypeRoute;