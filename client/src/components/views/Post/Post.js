import React,{useState, useEffect} from 'react'
import {
    MessageOutlined,
    HeartFilled,
    HeartOutlined,
    RetweetOutlined
  } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Image } from 'antd';
import axios from 'axios';

function Post(props) {
    
    const user = useSelector(state => state.user_reducer)
    const date = props.post.createdAt
    const [Like, setLike] = useState(false)
    const [LikeCount, setLikeCount] = useState(0)

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
    }, [])

    const onLikeHandler = (e) => {

        const variable = {
            likeFrom :user.userData._id,
            postId:props.post._id,
        }

        if(Like){ //좋아요 해제
             axios.post('/api/like/setLike', variable)
            .then(res=>{
                if(res.data.success){
                    setLike(!Like)
                    setLikeCount(LikeCount - 1)
                }else{
                    alert("좋아요 해제를 실패했습니다.")
                } 
            })
        }else{ //좋아요 처리
            axios.post('/api/like/unLike', variable)
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
            <div className="post">
                <div className="photo">
                    {props.post.filePath &&
                        <Image width={300} height={300} alt="photo" src={`http://localhost:5000/${props.post.filePath}`}/> 
                    }  
                </div>
                <div className="content" style={{'width':'300px','height':'300px','padding':'15px'}}>
                    <span className="title">{props.post.title}</span>
                    <span className="writer">{props.post.writer.name}</span>
                    <div>{props.post.content}</div>
                    <span className="date">{date.substring(0,10) +' '+ date.substring(11,16)}</span>
                </div>
            </div>
            <div className="option">
                <div className="comments icon"><MessageOutlined style={{'fontSize':'25px'}}/>0</div>
                
                <div className="like icon" onClick={onLikeHandler}>
                    {Like ? <HeartFilled style={{'fontSize':'25px'}}/>
                    :<HeartOutlined style={{'fontSize':'25px'}}/>}
                    {LikeCount}
                </div>
                
                <div className="share icon"><RetweetOutlined style={{'fontSize':'25px'}}/>0</div>
            </div>
        </div>
    )
}

export default Post
