const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String
    },
    content:{ //대댓글 
        type:String
    },
    filePath:{
        type:Array
    },
    date:{ //현재시간 불러오기
        type:String
    }
},{timestamps:true})

const Post = mongoose.model('Post', postSchema);

module.exports = { Post }