import React, {useState} from 'react'
import {
    CloseCircleOutlined, PropertySafetyTwoTone
  } from '@ant-design/icons';
import axios from 'axios';

import InputReplyComment from './InputReplyComment';

function Comment(props) {

    const date = props.comment.createdAt
    const [OpenReplyComment, setOpenReplyComment] = useState(false)

    const deleteCommnet = () => {
        axios.post('/api/comment/deleteComment',{_id:props.comment._id})
        .then(res=>{
            if(res.data.success){
                console.log('댓글 삭제 완료')
                props.deleteComment(props.comment._id)
            }
        })
    }

    const openReplyHandler = () => {
        setOpenReplyComment(!OpenReplyComment)
    }

    return (
        <>
        <div className="comment">
            <span style={{marginRight:'10px', width:'50px', textAlign:'center'}}>{props.comment.userId.name}</span>
            <span style={{width:'100%', textAlign:'justify'}}>
                {props.comment.comment}
                <br/>
                <span className="date">{`${date.substring(0,10)} ${date.substring(11,16)}`}</span>
                {
                    props.user._id === props.comment.userId._id? 
                    <CloseCircleOutlined onClick={deleteCommnet} style={{fontSize:'0.7rem' ,color:'gray', cursor:'pointer', marginLeft:'5px'}}/>
                    :<span onClick={openReplyHandler} style={{fontSize:'0.5rem' ,color:'gray', cursor:'pointer', marginLeft:'5px'}}>Reply</span>
                }
            </span>
        </div>
        {
            OpenReplyComment?
            <InputReplyComment comment={props.comment} user={props.user} post={props.post}/> : null
        }
        </>
    )
}

export default Comment
