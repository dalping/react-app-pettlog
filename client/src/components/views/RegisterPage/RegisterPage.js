import React,{useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import {withRouter} from  'react-router-dom';
import {Avatar} from 'antd';
import axios from 'axios';

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Name, setName] = useState("");
    const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const [File, setFile] = useState(null)

    const fileInput = useRef(null)

    const onEmailHandler = (e) =>{
        setEmail(e.target.value);
    }

    const onPasswordHandler = (e) =>{
        setPassword(e.target.value);
    }

    const onConfirmPasswordHandler = (e) =>{
        setConfirmPassword(e.target.value);
    }

    const onNameHandler = (e) =>{
        setName(e.target.value);
    }

    //API : 프로필 사진 서버에 저장 후 파일 경로 받아옴
    const onDrop = () => {

        const formData = new FormData();
        formData.append('file',File)

        const config = {
            header: { "Content-Type": "multipart/form-data" }
        }

        axios.post('/api/users/uploadProfileImage',formData, config)
        .then(res => {
            if(res.data.success){
                saveDataDB(res.data.url)
            }
        })
    }

    // API : 가입한 회원 정보 db에 저장
    const saveDataDB = (path) => {

        let body = {
            email : Email,
            password : Password,
            name : Name,
            profileImage : path
        }

        dispatch(registerUser(body))
        .then(res=>{
            if(res.payload.success){ 
                props.history.push('/login')
            }else{
                alert('로그인을 실패했습니다.');
            }
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(Password.length < 5){
            return alert('비밀번호를 5자 이상 입력해주세요.');
        }

        if(Password !== ConfirmPassword){
            return alert('비밀번호가 다릅니다.'); 
        }

        if(File!==null){
            onDrop()
        }else{
            saveDataDB('')
        }
    }

    // 프로필 사진 파일 업로드 핸들러
    const onChange = (e) => {

        if(e.target.files[0]){
            setFile(e.target.files[0])
        }else{ //업로드 취소할 시
            setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
            return
        }

        //프로필 사진 표시
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'100%',height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                
                <label>Profile Image</label>
                <Avatar src={Image} style={{margin:'20px'}} size={200} onClick={()=>{fileInput.current.click()}}/>
                <input type='file' 
                    style={{display:'none'}}
                    accept='image/jpg,impge/png,image/jpeg' 
                    name='profile_img'
                    onChange={onChange}
                    ref={fileInput}/>
                
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}></input>
                
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}></input>

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}></input>
                
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}></input>
                <br/>
                <button>
                    Register
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
