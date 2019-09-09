const express = require('express');
const app = express();
const inventoryRoute = express.Router();

let Inventory = require('../model/inventory');

//get all
inventoryRoute.route('/').get((req, res) => {
    Inventory.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

inventoryRoute.route('/add').post((req, res, next) => {
    Inventory.create(req.body, (error, data) => {
      if (error) {
        console.log("error in inv add");
        return next(error)
      } else {
        res.json(data)
      }
    })
});

module.exports = inventoryRoute;