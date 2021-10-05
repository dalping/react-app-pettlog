import React,{useState, useEffect} from 'react'
import {withRouter} from  'react-router-dom';
import axios from 'axios';
import Post from '../Post/Post';
import './MainPage.css';
import {useSelector} from 'react-redux';

function MainPage(props) {

    const [Posts, setPosts] = useState([])
    const user = useSelector(state => state.user_reducer)

    useEffect(() => {
        axios.get('/api/post/getPost')
        .then(res => {
            if(res.data.success){
                setPosts(res.data.posts.reverse())
            }else{
                alert('fail to load Post')
            }
        })
    }, [])

    const deletePost = (deletePostId) => {
        const idx = Posts.findIndex( p => p._id === deletePostId)
        const newArr = [...Posts]
        newArr.splice(idx, 1)
        setPosts(newArr)
    }

    const viewMyPost = () => {
        axios.post('/api/post/getMyPost',{writer:user.userData._id})
        .then(res => {
            if(res.data.success){
                setPosts(res.data.posts.reverse())
            }else{
                alert('fail to load MyPost')
            }
        })
    }

    const viewLikePost = () => {

    }

    return (
        <div className="mainpage box">
            <div className="writePostBtn" onClick={()=>{props.history.push('/write')}}>Write</div>
            <div className="category">
                <span onClick={viewMyPost}>내 포스트</span>
                <span>구독</span>
                <span>쪽지</span>
                <span onClick={viewLikePost}>하트를 누른 포스트</span>
            </div>
            <div className="posts box" style={{display:'flex', flexDirection:'column', gap:'20px'}}>
                {
                    Posts.length === 0 &&
                    <span>표시 할 포스트가 없습니다</span>
                }
                {Posts.map((data,idx)=>(
                    <Post key={idx} post={data} deletePost={deletePost}/>
                ))}
            </div>
        </div>
    )
}

export default withRouter(MainPage)

