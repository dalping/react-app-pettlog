import React,{useState, useEffect} from 'react'
import {withRouter} from  'react-router-dom';
import axios from 'axios';
import Post from '../Post/Post';

function MainPage(props) {

    const [Posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('/api/post/getPost')
        .then(res => {
            if(res.data.success){
                setPosts(res.data.posts)
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

    return (
        <div style={{padding:'20px', paddingTop:'76px'}}>
            <div className="writePostBtn" onClick={()=>{props.history.push('/write')}}>Write</div>
            <div className="posts" style={{display:'flex', flexDirection:'column'}}>
                {Posts.map((data,idx)=>(
                    <Post key={idx} post={data} deletePost={deletePost}/>
                ))}
            </div>
        </div>
    )
}

export default withRouter(MainPage)

