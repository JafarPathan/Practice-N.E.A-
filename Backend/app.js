const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post')
// const url = "mongodb+srv://sharki:wg59b1p34430rtuZ@cluster0-xaujr.mongodb.net/node-angular?retryWrites=true&w=majority";
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
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader(
    'Access-Control-Allow-Credentials', 'true'
  );
  next()
})

app.post("/api/post", (req, res, next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: "Post Added Successfully"
  })
})

app.put("/api/post/:id", (req, res, next)=>{
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post).then(result =>{
    console.log(result);
    res.status(200).json({message:'Updated'})
  })
})

app.get("/api/post", (req, res, next)=>{
  Post.find()
  .then(documents =>{
    // console.log(documents)
    res.json({
      message: "tuka saka baka",
      posts: documents
    })
  })
});


app.delete("/api/post/:id", (req, res, next)=>{
  console.log(req.params._id);
  Post.deleteOne({_id: req.params.id})
    .then((result)=>{
      console.log(result)
    res.status(200).json({message: "deleted"});

    })
});



module.exports = app;
