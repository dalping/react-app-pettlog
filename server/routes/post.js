const express = require('express');
const router = express.Router();
const { Post } = require("../models/Post");
const multer = require('multer');

var storage = multer.diskStorage({
    destination:(req, file, cb) => {
      console.log(file)
      cb(null, "uploads/");
    },
    filename:(req, file, cb) =>{
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  //   fileFileter:(req,file, cb)=>{
  //     const ext = path.extname(file.originalname) //확장자
  //     if(ext !== '.png'){
  //         return cb(res.status(400).end('only png plz'),false);
  //     }
  //     cb(null, true)
  //   }
});

var upload = multer({ storage: storage }).single("file")

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

  router.get('/getPost', (req, res) => {
    Post.find() 
    .populate('writer')
    .exec((err, posts) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true, posts})
    })
  })

  router.post('/uploadImage',(req, res)=>{
      console.log(req.body)
      upload(req, res, err => {
          if(err) return res.json({success:false, err})
          return res.json({success:true, url:res.req.file.path, fileName: res.req.file.filename})
      })
  })

module.exports = router;