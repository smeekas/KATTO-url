const express = require("express");
const mongoose = require("mongoose");
const urlRoutes=require('./routes/url');
const app = express();
const bodyParser=require('body-parser');
const path=require('path');
app.set('view engine','ejs');
app.set('views','views');
app.use(express.json());
app.use(express.static(path.join(__dirname,'js')));
app.use(express.static(path.join(__dirname,'css')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(urlRoutes);
require('dotenv').config();

// app.use((req, res, next) => {
// //404

// });
// app.use((error, req, res, next) => {});

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
  }
).then(result=>{
  // mongoose.set('useCreateIndex', true);
    app.listen(process.env.PORT || 5000);
    console.log('connected..');
}).catch(err=>{
    console.log(err);

})
