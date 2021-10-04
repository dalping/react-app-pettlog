import React, {useState} from 'react'
import {
    CloseCircleOutlined, PropertySafetyTwoTone
  } from '@ant-design/icons';
import axios from 'axios';
import { Input, Button } from 'antd';

function Comment(props) {

    const date = props.comment.createdAt
    const [OpenReplyComment, setOpenReplyComment] = useState(false)
    const [InputReply, setInputReply] = useState('')

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

    const InputReplyHandelr = (e) => {
        setInputReply(e.target.value)
    }

    const onSubmitReplyComment = (e) => {
        e.preventDefault();

        if(InputReply.length === 0) return 

        const variable = {

            replyTo : props.comment._id,
            userId : props.user._id,
            postId : props.post._id,
            comment : InputReply
        }

        axios.post('/api/comment/uploadReplyComment', variable)
        .then(res=>{
            if(res.data.success){
                setInputReply('')
                setOpenReplyComment(false)
                //props.updateComment(res.data.comment)   
            }else{
                alert('리플라이 코멘트 작성 실패')
            }
        })
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
            <div style={{backgroundColor:'gray', padding:'10px'}}>
                <form style={{display:'flex', width:'100%'}} onSubmit={onSubmitReplyComment}>
                    <Input type="text" value={InputReply} onChange={InputReplyHandelr} placeholder={`@${props.comment.userId.name} 에게 댓글 달기...`}/>
                    {
                        InputReply.length > 0 ? 
                        <Button type="text" onClick>작성</Button>
                        : <Button type="text" onClick disabled>작성</Button>
                    }
                </form>
            </div> : null
        }
        </>
    )
}

export default Comment
