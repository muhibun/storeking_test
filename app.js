const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dishRoute = require('./routes/dishRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/dishes', dishRoute);

app.listen(3000, function(e){
  console.log("listening on port 3000");
});


