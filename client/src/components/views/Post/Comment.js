import React,{useState, useEffect} from 'react'
import {
    CloseCircleOutlined
  } from '@ant-design/icons';

function Comment(props) {

    const date = props.comment.createdAt

    return (
        <div className="comment">
            <span style={{marginRight:'10px', width:'50px', textAlign:'center'}}>{props.comment.userId.name}</span>
            <span style={{width:'100%', textAlign:'justify'}}>
                {props.comment.comment}
                {
                    props.user._id === props.comment.userId._id? 
                    <CloseCircleOutlined style={{fontSize:'0.7rem' ,color:'gray', cursor:'pointer', marginLeft:'5px'}}/>
                    :<span style={{fontSize:'0.5rem' ,color:'gray', cursor:'pointer', marginLeft:'5px'}}>Reply</span>
                }
            </span>
            <span>{`${date.substring(0,10)} ${date.substring(11,16)}`}</span>
        </div>
    )
}

export default Comment
