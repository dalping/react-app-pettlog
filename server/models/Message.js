const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    messageTo:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    messageFrom:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    message:{
        type:String
    }
},{timestamps:true})

const Message = mongoose.model('Message', messageSchema);

module.exports = { Message }