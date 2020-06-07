const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const postRoutes = require('./Routes/posts')


mongoose.connect(  'mongodb://localhost/myapp' || url )
  .then(()=>{
    console.log('Connected to Database');
  })
  .catch(()=>{
    console.log('Connection Failed');
  })
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use("/images", express.static(path.join("Backend/images")))
// app.use((req, res, next)=>{
//   console.log(req)
//   next()
// })

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader(
    'Access-Control-Allow-Credentials', 'true'
  );
  next()
})

app.use('/api/post', postRoutes);


module.exports = app;
