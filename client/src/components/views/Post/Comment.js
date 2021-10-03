import React from 'react'
import {
    CloseCircleOutlined, PropertySafetyTwoTone
  } from '@ant-design/icons';
import axios from 'axios';

function Comment(props) {

    const date = props.comment.createdAt

    const deleteCommnet = () => {
        axios.post('/api/comment/deleteComment',{_id:props.comment._id})
        .then(res=>{
            if(res.data.success){
                console.log('댓글 삭제 완료')
                props.deleteComment(props.comment._id)
            }
        })
    }

    return (
        <div className="comment">
            <span style={{marginRight:'10px', width:'50px', textAlign:'center'}}>{props.comment.userId.name}</span>
            <span style={{width:'100%', textAlign:'justify'}}>
                {props.comment.comment}
                <br/>
                <span className="date">{`${date.substring(0,10)} ${date.substring(11,16)}`}</span>
                {
                    props.user._id === props.comment.userId._id? 
                    <CloseCircleOutlined onClick={deleteCommnet} style={{fontSize:'0.7rem' ,color:'gray', cursor:'pointer', marginLeft:'5px'}}/>
                    :<span style={{fontSize:'0.5rem' ,color:'gray', cursor:'pointer', marginLeft:'5px'}}>Reply</span>
                }
            </span>
        </div>
    )
}

export default Comment
