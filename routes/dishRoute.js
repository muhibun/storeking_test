const express = require('express');
const router = express.Router();
const schema = require('../mongo_schema/schema');
//const uuidv1 = require('uuid/v1');

//GET ALL DISHES
router.get('/', function(req, res, next) {
  schema.dishes.find({}, function(err, data){
		if(err){
			res.json({code : 400, data : err});
		}else{
			res.json({code : 200, data : data});
		}
	});
});

//INSERT NEW DISH
router.post('/', function(req, res, next) {
  const new_dish = new schema.dishes({
    dishesName: req.body.dishesName,
    createdDate: new Date().toISOString(),
    isActive: req.body.isActive
  });
  new_dish.save(function(err){
    if(err){
      res.json({code: 401, message : err});
    }else{
      res.json({code: 200, message: 'success insert new dish'});
    }
   })
});

//DELETE ALL DISH
router.delete('/', function(req, res, next) {
  schema.dishes.deleteMany({}, function(err, data){
    if(err){
      res.json({code: 402, message: err})
    }else{
      res.json({code: 200, message: 'success delete all document'});
    }
  });
});

//GET DISH BY ID
router.get('/:id', function(req, res, next) {
  schema.dishes.find({dishesId: req.params.id}, function(err, data){
		if(err){
			res.json({code : 400, data : err});
		}else{
			res.json({code : 200, data : data});
		}
	});
});

//UPDATE DISH BY ID
router.put('/:id', function(req, res, next) {
  const new_value = {
    dishesName: req.body.dishesName,
    isActive: req.body.isActive
  };
  schema.dishes.updateOne({dishesId: req.params.id}, new_value, function(err, data){
		if(err){
			res.json({code : 400, message : err});
		}else{
			res.json({code : 200, message : data});
		}
	});
});

//DELETE DISH BY ID
router.delete('/:id', function(req, res, next) {
  schema.dishes.deleteOne({dishesId: req.params.id}, function(err, data){
    if(err){
      res.json({code: 402, message: err})
    }else{
      res.json({code: 200, message: 'success delete document with id ' + req.params.id});
    }
  });
});

module.exports = router;
