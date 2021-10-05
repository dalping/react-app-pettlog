import React, {useState} from 'react'
import {
    CloseCircleOutlined
  } from '@ant-design/icons';
import axios from 'axios';

import InputReplyComment from './InputReplyComment';

function Comment(props) {

    const date = props.comment.createdAt
    const [OpenReplyComment, setOpenReplyComment] = useState(false)

    const deleteCommnet = (commentId) => {
        axios.post('/api/comment/deleteComment',{_id:commentId})
        .then(res=>{
            if(res.data.success){
                props.deleteComment(commentId)
            }
        })
    }

    const openReplyHandler = () => {
        setOpenReplyComment(!OpenReplyComment)
    }

    return (
        <>
        <div className="comment">
            <div className="commentMain">
                <span className="commentWriter">{props.comment.userId.name}</span>
                <span style={{width:'100%', textAlign:'justify'}}>
                    {props.comment.comment}
                    <br/>
                    <span className="date">{`${date.substring(0,10)} ${date.substring(11,16)}`}</span>
                    {
                        props.user._id === props.comment.userId._id? 
                        <CloseCircleOutlined className="commentBtn" onClick={()=>{deleteCommnet(props.comment._id)}} style={{fontSize:'0.7rem' ,color:'gray', cursor:'pointer', marginLeft:'5px'}}/>
                        :<span className="commentBtn" onClick={openReplyHandler}>Reply</span>
                    }
                </span>
            </div>
        </div>
        { //Reply Comments
            props.comments.map((data, idx) => (
                (
                    data.replyTo && data.replyTo === props.comment._id &&
                    <div className="comment" key={idx}>
                        <span style={{marginRight:"5px"}}> ↳ </span>
                        <div className="commentMain">
                            <span className="commentWriter">{data.userId.name}</span>
                            <span className="commentContent">
                                {data.comment}
                                <br/>
                                <span className="date">{`${date.substring(0,10)} ${date.substring(11,16)}`}</span>
                                {
                                    data.userId._id === props.user._id &&
                                    <CloseCircleOutlined className="commentBtn" onClick={()=>{deleteCommnet(data._id)}} />
                                }
                            </span>
                        </div>
                    </div>
                )
            ))
        }
        {
            OpenReplyComment?
            <InputReplyComment 
                comment={props.comment} 
                user={props.user} 
                post={props.post} 
                updateComment={props.updateComment}
                openReplyHandler={openReplyHandler}
            /> : null
        }
        </>
    )
}

export default Comment
