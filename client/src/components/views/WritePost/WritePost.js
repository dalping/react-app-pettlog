import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {message,Input,Upload,Button} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

function WritePost(props) {

    const user = useSelector(state => state.user_reducer)
    const [fileList, setFileList] = useState([]);
    const [Title, setTitle] = useState('')
    const [Content, setContent] = useState('')

    useEffect(() => {
        //console.log(fileList)
    }, [fileList])

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(Title.length === 0){
            message.error('제목을 작성해 주세요.')
            return
        }

        if(Content.length === 0){
            message.error('내용을 작성해 주세요.')
            return
        }

        if (fileList.length !== 0){ //올릴 이미지 파일이 있으면
            onDrop(fileList)
            return
        }else{
            uploadPost([])
        }
    }
        
    const uploadPost = (filePath) => {

        const variable = {
            writer:user.userData._id,
            title:Title,
            content:Content,
            filePath:filePath,
            date:new Date()
        }

        axios.post('/api/post/uploadPost', variable)
        .then(res=>{
            if(res.data.success){
                message.success('포스트를 업로드 했습니다.')
                props.history.push('/')
                }else{
                    alert('fail to upload Post')
                }
            })
        }

    const onDrop = async(files) => { //서버에 파일 업로드
        let formData = new FormData();
        formData.append("api_key", "992896418988878");
        formData.append("upload_preset", "ml_default");
        formData.append('file',files[0].originFileObj)

        const config = {
            header: { "Content-Type": "multipart/form-data" }
        }
        
        // for(let i=0 ; i < files.length; i++){
        //     formData.append(`file`, files[i].originFileObj);
        // }

        await axios.post('https://api.cloudinary.com/v1_1/rominicloudinary/image/upload', formData,config);

        // await axios.post('/api/post/uploadImage', formData, config)
        // .then(res=>{
        //     if(res.data.success){
        //         uploadPost(res.data.url)
        //     }else{
        //         console.log(res.data.err)
        //     }
        // })
    }
    
    const onFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };
   
    const onTitleHandler = (e) =>{
        if (Title.length > 30){
            alert('제목은 30자를 넘을 수 없습니다.')
            setTitle(e.target.value.substring(0,30))
            return
        }
        setTitle(e.target.value);
    }

    const onContentHandler = (e) => {

        if (Content.length > 500){
            alert('내용은 500자를 넘을 수 없습니다.')
            setContent(e.target.value.substring(0,500))
            return
        }
        setContent(e.target.value);
    }

    const beforeUpload = (file) => {

        if(file.size > 3 * 1024 * 1024){
            message.error('3MB 이하 이미지 파일만 업로드 할 수 있습니다.');
            return Upload.LIST_IGNORE;
        }

        return false
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'100%',height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column', width:'70%'}}>
                
                <label>Title</label>
                <Input type="text" value={Title} onChange={onTitleHandler} />
                
                <label>Content</label>
                <Input.TextArea type="text" value={Content} onChange={onContentHandler} style={{height:'200px'}}/>

                <label>Image</label>
                <Upload
                    accept='image/jpg,impge/png,image/jpeg'
                    listType="picture"
                    maxCount={3}
                    beforeUpload={beforeUpload}
                    multiple
                    onChange={onFileChange}
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

export default withRouter(WritePost)