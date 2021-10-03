import React,{useState, useEffect} from 'react'
import {withRouter} from  'react-router-dom';
import { useHistory } from 'react-router';
import axios from 'axios';
import Post from '../Post/Post';

function MainPage(props) {

    const [Posts, setPosts] = useState([])

    let history = useHistory();

    useEffect(() => {
        console.log(Posts.length)
    }, [Posts])

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

    return (
        <div style={{padding:'20px', paddingTop:'76px'}}>
            <div className="writePostBtn" onClick={()=>{history.push('/write')}}>Write</div>
            <div className="posts" style={{display:'flex', flexDirection:'column'}}>
                {Posts.map((data,idx)=>(
                    <Post key={idx} post={data} />
                ))}
            </div>
        </div>
    )
}

export default withRouter(MainPage)

