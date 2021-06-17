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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(urlRoutes);


// app.use((req, res, next) => {
// //404

// });
// app.use((error, req, res, next) => {});

mongoose.connect(
  "mongodb+srv://smeet:smeet@cluster0.uyisx.mongodb.net/katto-url",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(result=>{
    app.listen(5000);
    console.log('connected..');
}).catch(err=>{
    console.log(err);

})
