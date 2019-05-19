const express = require('express');
const router = express.Router();
const schema = require('../mongo_schema/schema');
//const uuidv1 = require('uuid/v1');

//GET ALL DISHES
router.get('/', function(req, res, next) {
  schema.dishes.find({}).then(function(data){
    res.json({code : 200, data : data});
  }).catch(function(err){
    res.json({code : 400, data : err});
  });
});

//INSERT NEW DISH
router.post('/', function(req, res, next) {
  const new_dish = new schema.dishes({
    dishesName: req.body.dishesName,
    createdDate: new Date().toISOString(),
    isActive: req.body.isActive
  });
  new_dish.save().then(function(data){
    res.json({code: 200, message: 'success insert new dish'});
  }).catch(function(err){
    res.json({code: 401, message : err});
  });
});

//DELETE ALL DISH
router.delete('/', function(req, res, next) {
  schema.dishes.deleteMany({}).then(function(data){
    res.json({code: 200, message: 'success delete all document'});
  }).catch(function(err){
    res.json({code: 402, message: err});
  });
});

//GET DISH BY ID
router.get('/:id', function(req, res, next) {
  schema.dishes.find({dishesId: req.params.id}).then(function(data){
    res.json({code : 200, data : data});
  }).catch(function(err){
    res.json({code : 400, data : err});
  });

});

//UPDATE DISH BY ID
router.put('/:id', function(req, res, next) {
  const new_value = {
    dishesName: req.body.dishesName,
    isActive: req.body.isActive
  };
  schema.dishes.updateOne({dishesId: req.params.id}, new_value).then(function(data){
    res.json({code : 200, message : data});
  }).catch(function(err){
    res.json({code : 401, message : err});
  });
});

//DELETE DISH BY ID
router.delete('/:id', function(req, res, next) {
  schema.dishes.deleteOne({dishesId: req.params.id}).then(function(data){
    res.json({code : 200, message : 'success delete document with id ' + req.params.id});
  }).catch(function(err){
    res.json({code : 402, message : err});
  });
});

module.exports = router;
