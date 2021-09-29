import axios from 'axios';
import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import {message} from 'antd';

function WritePost(props) {

    const user = useSelector(state => state.user_reducer)

    const [Title, setTitle] = useState('')
    const [Content, setContent] = useState('')

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const variable = {
            writer:user.userData._id,
            title:Title,
            content:Content
        }

        axios.post('/api/upload/post', variable)
        .then(res=>{
            if(res.data.success){
                message.success('성공적으로 업로드 했습니다.')
                // setTimeout(()=>{
                //     props.history.push('/')
                // }, 3000)
            }else{
                alert('fail to upload Post')
            }
        })
    }

    const onTitleHandler = (e) =>{
        setTitle(e.target.value);
    }

    const onContentHandler = (e) =>{
        setContent(e.target.value);
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'100%',height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                
                <label>Title</label>
                <input type="text" value={Title} onChange={onTitleHandler}></input>
                
                <label>Content</label>
                <input type="text" value={Content} onChange={onContentHandler}></input>

                <label>Image</label>
                
                <button>
                    Upload
                </button>
            </form>
        </div>
    )
}

export default WritePost