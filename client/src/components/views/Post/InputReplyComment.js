import React, {useState} from 'react'
import { Input, Button } from 'antd'
import axios from 'axios'

function InputReplyComment(props) {
    
    const [InputReply, setInputReply] = useState('')
    
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
                props.updateComment(res.data.comment)
                props.openReplyHandler()  
            }else{
                alert('리플라이 코멘트 작성 실패')
            }
        })
    }

    return (
        <div className="inputReplyComment">
            <form style={{display:'flex', width:'100%'}} onSubmit={onSubmitReplyComment}>
                <Input type="text" value={InputReply} onChange={InputReplyHandelr} placeholder={`@${props.comment.userId.name} 에게 댓글 달기...`}/>
                {
                    InputReply.length > 0 ? 
                    <Button type="text" onClick={onSubmitReplyComment}>작성</Button>
                    : <Button type="text" disabled>작성</Button>
                }
            </form>
        </div>
    )
}

export default InputReplyComment
