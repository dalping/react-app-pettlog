import React,{useState, useEffect} from 'react'
import {
    CloseSquareOutlined,
    MessageOutlined,
    HeartFilled,
    HeartOutlined,
    RetweetOutlined
  } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Image,Popconfirm} from 'antd';
import axios from 'axios';
import Comment from './Comment';
import InputComment from './InputComment';

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

        axios.post('/api/comment/getComment',{postId:props.post._id})
        .then(res => {
            if(res.data.success){
                setComments(res.data.comments)
            }
        })

    }, [])

    const deletePostHandler = (e) => {

        console.log(props.post)

        axios.post('/api/post/deletePost',{postId:props.post._id})
        .then(res=>{
            if(res.data.success){
                console.log('삭제 완료')
            }
        })
    }

    const showCommentHandler = (e) => {
        setOpenComment(!OpenComment)
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
        <div className="total" style={{"border":"1px solid gray",'borderRadius':'5px'}}>
            
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
                        //onClick={deletePostHandler}
                    />
                </Popconfirm>
            }

            <div className="post">
                <div className="photo">
                    {props.post.filePath &&
                        <Image width={300} height={300} alt="photo" src={`http://localhost:5000/${props.post.filePath}`}/> 
                    }  
                </div>
                <div className="content" style={{'width':'300px','height':'300px','padding':'15px'}}>
                    <span className="title">{props.post.title}</span>
                    <span className="writer">{props.post.writer.name}</span>
                    <div className="box" style={{textAlign:'justify', maxHeight:'200px',overflow:'scroll'}}>{props.post.content}</div>
                    <span className="date">{date.substring(0,10) +' '+ date.substring(11,16)}</span>
                </div>
            </div>

            <InputComment user={user.userData} postId={props.post._id} updateComment={updateComment}/>

            <div className="option">
                <div className="comment_icon icon" onClick={showCommentHandler}><MessageOutlined style={{'fontSize':'25px'}}/>{Comments.length}</div>
                <div className="like_icon icon" onClick={onLikeHandler}>
                    {Like ? <HeartFilled style={{fontSize:'25px',color:'red'}}/>
                    :<HeartOutlined style={{'fontSize':'25px'}}/>}
                    {LikeCount}
                </div>
                <div className="share_icon icon"><RetweetOutlined style={{'fontSize':'25px'}}/></div>
            </div>
            {OpenComment && Comments.length !== 0 &&  
                <div className="comments box">
                    {
                        Comments && Comments.map((data,idx)=>(
                            <Comment key={idx} comment={data} user={user.userData}/>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Post
