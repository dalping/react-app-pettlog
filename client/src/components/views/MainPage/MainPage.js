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
        //한번만 실행하게 하고싶다.
        //getPosts에 성공하면 다시 Loading을 true로 변경
        //Post를 불러오는 중이거나
        //더이상 불러올 포스트가 없는 경우 Loading을 false로 변경

        if(Loading){
            const observer = new IntersectionObserver(
                entries => {
                    if(entries[0].isIntersecting){
                        console.log('옵저버 실행')
                        getPosts()
                    }
                },
                //100%일 때 옵저버 실행
                {threshold: 0.5 },
            );
            observer.observe(pageEnd.current)
        }
    }, [Page])

    const getPosts = () => {

        if(Post.length === 0) return

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
            <div className="writePostBtn" onClick={()=>{props.history.push('/write')}}>Write</div>
            <div className="category">
                <span onClick={viewMyPost}>내 포스트</span>
                <span>구독</span>
                <span>쪽지</span>
                <span onClick={viewLikePost}>하트를 누른 포스트</span>
            </div>
            <div className="posts box">
                {
                    Posts.length === 0 &&
                    <span>표시 할 포스트가 없습니다..</span>
                }
                {Posts.map((data,idx)=>(
                    <Post key={idx} post={data} deletePost={deletePost}/>
                ))}
                {
                    Loading && 
                    <div className="catchScroll" ref={pageEnd}><LoadingOutlined style={{fontSize:'24px'}}/></div>
                }
            </div>
        </div>
    )
}

export default withRouter(MainPage)

