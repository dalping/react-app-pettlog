import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {message,Input,Upload,Button} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function WritePost(props) {

    const user = useSelector(state => state.user_reducer)
    const [fileList, setFileList] = useState(null);
    const [Title, setTitle] = useState('')
    const [Content, setContent] = useState('')

    useEffect(() => {
        console.log(fileList)
    }, [fileList])

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (fileList){
            onDrop(fileList)
        }

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
        if (Title.length > 30){
            alert('제목은 30자를 넘을 수 없습니다.')
            setTitle(e.target.value.substring(0,30))
            return
        }
        setTitle(e.target.value);
    }

    const onDrop = (files) => { //서버에 파일 업로드
        let formData = new FormData;
        const config = {
            hearder : {'content-type':'multipart/form-data'}
        }
        formData.append("file", files[0])

        axios.post('/api/upload/image', formData, config)
        .then(res=>{
            if(res.data.success){
                console.log(res.data)
            }else{
                alert('이미지 업로드 실패')
            }
        })
    }

    const handleBefore = (file) => {
        setFileList(file);
        return false
      }

    const onContentHandler = (e) =>{
        if (Content.length > 500){
            alert('내용은 500자를 넘을 수 없습니다.')
            setContent(e.target.value.substring(0,500))
            return
        }
        setContent(e.target.value);
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'100%',height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column', width:'30%'}}>
                
                <label>Title</label>
                <Input type="text" value={Title} onChange={onTitleHandler} />
                
                <label>Content</label>
                <Input.TextArea type="text" value={Content} onChange={onContentHandler} style={{height:'200px'}}/>

                <label>Image</label>
                <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={handleBefore}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
                
                <button onClick={onSubmitHandler} style={{marginTop:'10px'}}>
                    Upload
                </button>
            </form>
        </div>
    )
}

export default WritePost