const express = require('express');
const app = express();
const testRoute = express.Router();

let Test = require('../model/test');

//get all
testRoute.route('/').get((req, res) => {
    Test.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

module.exports = testRoute;