const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");

//=================================
//             Like
//=================================

router.post('/getLike', (req, res) => {
    Like.find(req.body)
    .exec((err, like) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true, like})
    })
})

router.post('/setLike', (req, res) => {

    const like = new Like(req.body)

    like.save((err, doc) => {
        if(err) return res.json({success:false, err})
        res.status(200).json({success:true})
    })
})

router.post('/unLike', (req, res) => {
    Like.deleteOne(req.body)
    .exec((err, result)=>{
        if(err) return result.status(400).json({success:false, err})
        res.status(200).json({success:true})
    })
})

module.exports = router;