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
        res.status(200).json({success:true, comment:doc})
    })
})

module.exports = router;