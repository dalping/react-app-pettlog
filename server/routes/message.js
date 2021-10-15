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
    .populate('messageFrom','messageTo')
    .exec((err, msg)=>{
        if(err) return res.status(400).send(err)
        console.log(msg)
        res.status(200).json({success:true, msg})
    })
})

module.exports = router;