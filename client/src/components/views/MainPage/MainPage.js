import React,{useState, useEffect} from 'react'
import {withRouter} from  'react-router-dom';
import { Button } from 'antd';
import { useHistory } from 'react-router';
import axios from 'axios';
import Post from '../Post/Post';

function MainPage(props) {

    const [Posts, setPosts] = useState([])

    let history = useHistory();

    useEffect(() => {
        axios.get('/api/import/post')
        .then(res => {
            if(res.data.success){
                setPosts(res.data.posts)
                console.log(Posts)
            }else{
                alert('fail to load Post')
            }
        })
    }, [])

    return (
        <div style={{padding:'20px', paddingTop:'76px'}}>
            <Button style={{marginBottom:'20px'}}type="primary" onClick={()=>{history.push('/write')}}>Write</Button>
            <div className="posts" style={{display:'flex', flexDirection:'column'}}>
                {Posts.map((data,idx)=>(
                    <Post key={idx} post={data}/>
                ))}
            </div>
        </div>
    )
}

export default withRouter(MainPage)

