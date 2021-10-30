import React,{useState, useEffect, useRef} from 'react'
import {withRouter, useParams} from  'react-router-dom';
import axios from 'axios';
import Post from '../Post/Post';
import '../MainPage/MainPage.css';
import {useSelector} from 'react-redux';
import {LoadingOutlined} from '@ant-design/icons';

function PostWriterPage(props) {
    
    const user = useSelector(state => state.user_reducer)
    const { postWriterId } = useParams();
    const [Posts, setPosts] = useState([])
    const [Page, setPage] = useState(0)
    const [Loading, setLoading] = useState(true)

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

    //API : 모든 포스트 불러오기 (5개 단위)
    const getPosts = () => {

        setLoading(false)
        
        const variable = {
            skip:Page,
            userId:{writer:postWriterId}
        }

        axios.post('/api/post/getPost',variable)
        .then(res => {
            if(res.data.success){
                const newData = res.data.posts
                if(newData.length !== 0){
                    console.log(newData)
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

    //Post컴포넌트로 부터 포스트 삭제 처리
    const deletePost = (deletePostId) => {
        const idx = Posts.findIndex( p => p._id === deletePostId)
        const newArr = [...Posts]
        newArr.splice(idx, 1)
        setPosts(newArr)
    }

    //내 포스트 페이지로 이동하기
    const viewMyPost = () => {
        props.history.push(`/Post/${user.userData._id}`)
    }

    const viewLikePost = () => {

    }

    return (
        user && 
        <div className="mainpage box">
            <div className="category">
                <span onClick={viewMyPost}>My Post</span>
                <span>Subscribe</span>
                <span onClick={()=>{props.history.push('/message')}}>Message</span>
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
                        <Post 
                            key={idx} post={data} deletePost={deletePost}/>
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

export default withRouter(PostWriterPage)

