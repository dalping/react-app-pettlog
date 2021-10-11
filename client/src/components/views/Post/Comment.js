import React, {useState} from 'react'
import {
    CloseCircleOutlined,
    UserOutlined
  } from '@ant-design/icons';
import { Avatar } from 'antd';
import axios from 'axios';
import './Comment.css'

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
        {
            props.comment.userId.profileImage?
            <Avatar size={48} src={`http://localhost:5000/${props.comment.userId.profileImage}`} style={{marginRight:'10px'}} />
            :<Avatar size={48} icon={<UserOutlined />} style={{marginRight:'10px'}}/>
        }
            <div className="commentMain">
                <span className="commentWriter">{props.comment.userId.name}</span>
                <span style={{width:'100%', textAlign:'justify'}}>
                    {props.comment.comment}
                    <br/>
                    <span className="commentDate">{`${date.substring(0,10)} ${date.substring(11,16)}`}</span>
                    {
                        props.user._id === props.comment.userId._id? 
                        <CloseCircleOutlined className="commentBtn" onClick={()=>{deleteCommnet(props.comment._id)}} />
                        :<span className="commentBtn" onClick={openReplyHandler}>Reply</span>
                    }
                </span>
            </div>
        </div>
        { //Reply Comments
            props.comments.map((data, idx) => 
                (
                    data.replyTo && data.replyTo === props.comment._id &&
                    <div className="comment" key={idx}>
                        <span style={{marginRight:"10px"}}> ↳ </span>
                        {
                            data.userId.profileImage?
                            <Avatar size={48} src={`http://localhost:5000/${data.userId.profileImage}`} style={{marginRight:'10px'}} />
                            :<Avatar size={48} icon={<UserOutlined />} style={{marginRight:'10px'}}/>
                        }
                        <div className="commentMain">
                            <span className="commentWriter">{data.userId.name}</span>
                            <span className="commentContent">
                                {data.comment}
                                <br/>
                                <span className="commentDate">{`${date.substring(0,10)} ${date.substring(11,16)}`}</span>
                                {
                                    data.userId._id === props.user._id &&
                                    <CloseCircleOutlined className="commentBtn" onClick={()=>{deleteCommnet(data._id)}} />
                                }
                            </span>
                        </div>
                    </div>
                )
            )
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
