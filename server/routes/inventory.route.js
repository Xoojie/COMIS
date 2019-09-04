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

module.exports = inventoryRoute;