const express = require('express');
const { message } = require('../../client/node_modules/antd/lib');
const router = express.Router();
const { Message } = require("../models/Message");

//=================================
//             Message
//=================================

router.post('/sendMesage', (req, res) => {

    const message = new Message(req.body)

    message.save((err, doc) => {
        if(err) return res.json({success:false, err})
        res.status(200).json({success:true})
    })
})

router.post('/getMessage', (req, res) => {
    Message.find(req.body)
    .populate('messageFrom')
    .exec((err, msg)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true, msg})
    })
})

router.post('/deleteMessage', (req, res) => {
    Message.deleteOne(req.body)
    .exec((err, result)=>{
        if(err) return result.status(400).json({success:false, err})
        res.status(200).json({success:true})
    })
})

module.exports = router;