const express = require('express');
const app = express();
const inventorySubTypeRoute = express.Router();

let InventorySubType = require('../model/inventorySubType');

//get all
inventorySubTypeRoute.route('/').get((req, res) => {
  InventorySubType.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
// get one
inventorySubTypeRoute.route('/get/id=:id').get((req, res) => {
  InventorySubType.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// add
inventorySubTypeRoute.route('/post').post((req, res, next) => {
  InventorySubType.create(req.body, (error, data) => {
      if (error) {
        console.log("error in inv add");
        return next(error)
      } else {
        res.json(data)
      }
    })
});
//update
inventorySubTypeRoute.route('/update/:id').put((req, res, next) => {
  InventorySubType.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})
//get by type and subtype for ABBV
inventorySubTypeRoute.route('/get/class=:class&type=:type&subType=:subType').get((req, res) => {
  InventorySubType.find({ class: req.params.class , type: req.params.type , subType: req.params.subType },{},{}, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})
//get by type for subTypes
inventorySubTypeRoute.route('/get/class=:class&type=:type').get((req, res) => {
  InventorySubType.find({ class: req.params.class , type: req.params.type },{},{}, (error, data) => {
if (error) {
  return next(error)
} else {
  res.json(data)
}
})
})

module.exports = inventorySubTypeRoute;