const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================

router.post('/getComment', (req, res) => {
    Comment.find(req.body)
    .populate('userId')
    .exec((err, comments) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true, comments})
    })
})

router.post('/uploadComment', (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, doc) => { 
        if(err) return res.json({success:false, err})
        
        Comment.find(req.body)
        .populate('userId')
        .exec((err, comment)=>{
            if(err) return res.json({success:false, err})
            res.status(200).json({success:true, comment:comment})
        })
    })
})

router.post('/uploadReplyComment', (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, doc) => { 
        if(err) return res.json({success:false, err})
        
        Comment.find(req.body)
        .populate('userId')
        .exec((err, comment)=>{
            if(err) return res.json({success:false, err})
            res.status(200).json({success:true, comment:comment})
        })
    })
})

router.post('/deleteComment', (req, res) => {
    Comment.deleteOne(req.body)
    .exec((err, result)=>{
        if(err) return result.status(400).json({success:false, err})

        //메인 댓글과 연결된 대댓글 삭제
        Comment.deleteMany({replyTo:req.body._id})
        .exec((err, result)=>{
        if(err) return result.status(400).json({success:false, err})
        });

        res.status(200).json({success:true})
    });
})



module.exports = router; 