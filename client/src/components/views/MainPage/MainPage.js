import React,{useState, useEffect, useRef} from 'react'
import {withRouter} from  'react-router-dom';
import axios from 'axios';
import Post from '../Post/Post';
import './MainPage.css';
import {useSelector} from 'react-redux';
import {LoadingOutlined} from '@ant-design/icons';

function MainPage(props) {

    const [Posts, setPosts] = useState([])
    const [Page, setPage] = useState(0)
    const [Loading, setLoading] = useState(true)

    const user = useSelector(state => state.user_reducer)
    const pageEnd = useRef()
    
    //Infinite Scrolling
    useEffect(() => {
        if(Loading){
            const observer = new IntersectionObserver(
                entries => {
                    if(entries[0].isIntersecting){
                        getPosts()
                    }
                },
                //100%일 때 옵저버 실행
                {threshold: 1 },
            );
            observer.observe(pageEnd.current)
        }
    }, [Page])

    const getPosts = () => {

        setLoading(false)
        
        const variable = {
            skip:Page
        }
    
        axios.post('/api/post/getPost',variable)
        .then(res => {
            if(res.data.success){
                const newData = res.data.posts
                if(newData.length !== 0){
                    setPosts(Posts.concat(newData))
                    setLoading(true)
                    setPage(Page + 1)
                }else{ //더이상 포스트가 없음
                    setLoading(false)
                }
            }else{
                alert('fail to load Post')
            }
        })
    }

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
        user && 
        <div className="mainpage box">
            <div className="category">
                <span onClick={viewMyPost}>My Post</span>
                <span>Subscribe</span>
                <span>Message</span>
                <span onClick={viewLikePost}>Like Post</span>
                <div className="writePostBtn" onClick={()=>{props.history.push('/write')}}>Write</div>
            </div>
            <div className="posts box">
                {
                    Posts.length === 0 &&
                    <span>표시 할 포스트가 없습니다..</span>
                }
                {
                    Posts.map((data,idx)=>(
                        <Post key={idx} post={data} deletePost={deletePost}/>
                    ))
                }
                {
                    Loading &&
                    <div className="catchScroll" ref={pageEnd}><LoadingOutlined style={{fontSize:'24px'}}/></div>
                }
            </div>
        </div>
    )
}

export default withRouter(MainPage)

