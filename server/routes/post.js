const express = require('express');
const router = express.Router();
const { Post } = require("../models/Post");
const { Like } = require("../models/Like");
const { Comment } = require("../models/Comment");
const multer = require('multer');
const fs = require('fs')

var storage = multer.diskStorage({
    destination:(req, file, cb) => {
      cb(null, "uploads/");
    },
    filename:(req, file, cb) =>{
      cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFileter:(req,file, cb)=>{
      const ext = path.extname(file.originalname) //확장자
      if(ext !== '.png'&&ext !== '.jpg'&&ext !== '.jpeg'){
          return cb(res.status(400).end('only png plz'),false);
      }
      cb(null, true)
    }
});

var upload = multer({ storage: storage }).array("file")

//=================================
//             Post
//=================================

router.post('/uploadPost', (req, res)=>{

    const post = new Post(req.body)
    
    post.save((err,doc) => { //save to mongoDB
        if(err) return res.json({success:false, err})
        res.status(200).json({success:true})
    })
  })

  router.post('/getPost', (req, res) => {
    Post.find().skip(req.body.skip * 3).limit(3)
    .populate('writer')
    .exec((err, posts) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true, posts})
    })
  })

  router.post('/getMyPost', (req, res) => {
    Post.find(req.body) 
    .populate('writer')
    .exec((err, posts) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true, posts})
    })
  })

  router.post('/uploadImage',(req, res)=> {
      upload(req, res, err => {
          if(err) return res.json({success:false, err})

          const filePath = []
          for(let i=0;i<res.req.files.length;i++){
            filePath.push(res.req.files[i].path)
          }

          return res.json({success:true, url:filePath})
      })
  })

  router.post('/deletePost', (req, res) => {

    Post.deleteOne({_id:req.body.postId})
    .exec((err, result)=>{
      if(err) return result.status(400).json({success:false, err})
    });
    
    Like.deleteMany({postId:req.body.postId})
    .exec((err, result)=>{
      if(err) return result.status(400).json({success:false, err})
    });
    
    Comment.deleteMany({postId:req.body.postId})
    .exec((err, result)=>{
      if(err) return result.status(400).json({success:false, err})
    });
    
    //image file delete
    req.body.filePath.forEach( path =>{
      fs.unlink(path, (err) => {
        console.log(err) //파일은 정상적으로 삭제되는데 에러를 반환하는 문제
      })
    })
  
    res.status(200).json({success:true})
  })

module.exports = router;