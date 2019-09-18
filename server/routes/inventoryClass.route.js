const express = require('express');
const app = express();
const inventoryClassRoute = express.Router();

let InventoryClass = require('../model/inventoryClass');

//get all
inventoryClassRoute.route('/').get((req, res) => {
    InventoryClass.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
// get one
inventoryClassRoute.route('/get/id=:id').get((req, res) => {
  InventoryClass.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// add
inventoryClassRoute.route('/post').post((req, res, next) => {
    InventoryClass.create(req.body, (error, data) => {
      if (error) {
        console.log("error in inv add");
        return next(error)
      } else {
        res.json(data)
      }
    })
});
//update
inventoryClassRoute.route('/update/:id').put((req, res, next) => {
  InventoryClass.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})
//get by type and subtype
inventoryClassRoute.route('/get/class=:class&type=:type&subType=:subType').get((req, res) => {
  InventoryClass.find({ class: req.params.class , type: req.params.type , subType: req.params.subType },{},{}, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})
//get by type
inventoryClassRoute.route('/get/class=:class&type=:type').get((req, res) => {
  InventoryClass.find({ class: req.params.class , type: req.params.type },{},{}, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})

module.exports = inventoryClassRoute;