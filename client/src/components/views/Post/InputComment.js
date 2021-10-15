import axios from 'axios'
import React,{useState} from 'react'
import { Input, Button } from 'antd';

function InputComment(props) {
        
    const [InputComment, setInputComment] = useState('')

    const inputCommentHandler = (e) => {
        setInputComment(e.target.value)
    }

    const onSubmitComment = (e) => {
        e.preventDefault();

        if(InputComment.length === 0) return 

        const variable = {
            userId : props.user._id,
            postId : props.postId,
            comment : InputComment
        }

        axios.post('/api/comment/uploadComment', variable)
        .then(res=>{
            if(res.data.success){
                setInputComment('') 
                props.updateComment(res.data.comment)   
            }else{
                alert('코멘트 작성 실패')
            }
        })
    }

    return (
        <div className="inputComment">
            <form style={{display:'flex', width:'100%'}} onSubmit={onSubmitComment} >
                <Input type="text" value={InputComment} onChange={inputCommentHandler} placeholder="댓글을 입력하세요..."/>
                { 
                    InputComment.length > 0 ? 
                    <Button type="text" onClick={onSubmitComment}>작성</Button>
                    : <Button type="text" disabled>작성</Button>
                }
            </form>
        </div>
    )
}

export default InputComment
