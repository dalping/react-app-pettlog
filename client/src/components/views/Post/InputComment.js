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
            <span style={{marginRight:'10px'}}>{props.user.name}</span>
            <form style={{display:'flex', width:'100%'}} onSubmit={onSubmitComment}>
                <Input type="text" value={InputComment} onChange={inputCommentHandler}/>
                <Button onClick={onSubmitComment}>작성</Button>
            </form>
        </div>
    )
}

export default InputComment
