import React,{useState, useEffect} from 'react'
import {
    CloseSquareOutlined,
    MessageOutlined,
    HeartFilled,
    HeartOutlined,
    RetweetOutlined
  } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Image,Popconfirm,Carousel} from 'antd';
import axios from 'axios';
import Comment from './Comment';
import InputComment from './InputComment';
import './Post.css'
import './Comment.css'

function Post(props) {
    
    const user = useSelector(state => state.user_reducer)
    const date = props.post.createdAt
    const [Like, setLike] = useState(false)
    const [LikeCount, setLikeCount] = useState(0)
    const [Comments, setComments] = useState([])
    const [OpenComment, setOpenComment] = useState(false)

    useEffect(() => {
        //좋아요 수 불러오기 및 나의 좋아요 여부 확인
        axios.post('/api/like/getLike', {postId:props.post._id})
        .then(res => {
            if(res.data.success){
                setLikeCount(res.data.like.length)
                if(res.data.like.filter(me => me.likeFrom.includes(user.userData._id)).length === 0){
                    setLike(false)
                }else{
                    setLike(true)
                }
            }
        })

        //해당 포스트의 댓글 불러오기
        axios.post('/api/comment/getComment',{postId:props.post._id})
        .then(res => {
            if(res.data.success){
                setComments(res.data.comments)
            }
        })
    }, [])

    const deletePostHandler = (e) => {
        axios.post('/api/post/deletePost',{postId:props.post._id})
        .then(res=>{
            if(res.data.success){
                props.deletePost(props.post._id)
            }
        })
    }
    
    const showCommentHandler = (e) => {
        setOpenComment(!OpenComment)
    }
    
    const deleteComment = (deleteCommentId) => {
        const idx = Comments.findIndex( p => p._id === deleteCommentId)
        const newArr = [...Comments]
        newArr.splice(idx, 1)
        setComments(newArr)
    }

    const updateComment = (newComment) => {
        setComments(Comments.concat(newComment))
    }
    
    const onLikeHandler = (e) => {

        const variable = {
            likeFrom :user.userData._id,
            postId:props.post._id,
        }

        if(Like){ //좋아요 해제
             axios.post('/api/like/unLike', variable)
            .then(res=>{
                if(res.data.success){
                    setLike(!Like)
                    setLikeCount(LikeCount - 1)
                }else{
                    alert("좋아요 해제를 실패했습니다.")
                } 
            })
        }else{ //좋아요 처리
            axios.post('/api/like/setLike', variable)
            .then(res => {
                if(res.data.success){
                    setLike(!Like)
                    setLikeCount(LikeCount + 1)
                }else{
                    alert("좋아요를 실패했습니다.")
                }
            })
        }
    } 

    return (
        <div className="total">
            
            {
                user.userData._id === props.post.writer._id &&
                <Popconfirm
                    title="포스트를 삭제하시겠습니까?"
                    onConfirm={deletePostHandler}
                    okText="Yes"
                    cancelText="No"
                >
                    <CloseSquareOutlined 
                        style={{position:'absolute', margin:'5px', left:'595px', cursor:'pointer'}}
                    />
                </Popconfirm>
            }

            <div className="post">
                <div className="photo">
                    {props.post.filePath.length > 0 &&
                        <Carousel autoplay>
                            {
                                props.post.filePath.map((data, idx)=>(
                                    <div key={idx}>
                                        <Image width={300} height={300} alt="photo" src={`http://localhost:5000/${props.post.filePath[idx]}`}/> 
                                    </div>
                                ))
                            }
                        </Carousel>
                    }  
                </div>
                <div className="content">
                    <span className="title">{props.post.title}</span>
                    <span className="writer">{props.post.writer.name}</span>
                    <div className="postContent box">{props.post.content}</div>
                    <span className="date">{date.substring(0,10) +' '+ date.substring(11,16)}</span>
                </div>
            </div>

            <InputComment user={user.userData} postId={props.post._id} updateComment={updateComment}/>

            <div className="option">
                <div className="comment_icon icon" onClick={showCommentHandler}>
                    <MessageOutlined className="optionIcon"/>{Comments.length}
                </div>
                <div className="like_icon icon" onClick={onLikeHandler}>
                    {Like ? <HeartFilled className="optionIcon" style={{color:'red'}}/>
                    :<HeartOutlined className="optionIcon"/>}
                    {LikeCount}
                </div>
                <div className="share_icon icon">
                    <RetweetOutlined className="optionIcon"/>
                </div>
            </div>

            {OpenComment && Comments.length !== 0 &&  
                <div className="comments box">
                    {
                        Comments && Comments.map((data,idx)=>(
                            ( !data.replyTo &&  
                            <Comment 
                                key={idx} 
                                comments={Comments} 
                                comment={data} 
                                user={user.userData} 
                                post={props.post} 
                                deleteComment={deleteComment}
                                updateComment={updateComment}
                            />
                            )
                        ))
                    }
                </div>
            }

        </div>
    )
}

export default Post
