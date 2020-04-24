const express = require('express');
const Post = require('../models/post')
const router = express.Router()

router.post("", (req, res, next)=>{
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

router.put("/:id", (req, res, next)=>{
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

router.get("", (req, res, next)=>{
  Post.find()
  .then(documents =>{
    // console.log(documents)
    res.json({
      message: "tuka saka baka",
      posts: documents
    })
  })
});


router.delete("/:id", (req, res, next)=>{
  console.log(req.params._id);
  Post.deleteOne({_id: req.params.id})
    .then((result)=>{
      console.log(result)
    res.status(200).json({message: "deleted"});

    })
});

module.exports = router;
