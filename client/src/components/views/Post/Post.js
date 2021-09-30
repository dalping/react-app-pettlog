import React from 'react'
import {
    MessageOutlined,
    HeartOutlined,
    RetweetOutlined
  } from '@ant-design/icons';

function Post(props) {
    //console.log(props.post)
    const date = props.post.createdAt

    return (
        <div className="total" style={{"border":"1px solid gray",'borderRadius':'5px'}}>
            <div className="post">
                <div className="photo">
                    image
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
                
                <div className="like icon"><HeartOutlined style={{'fontSize':'25px'}}/>0</div>
                
                <div className="share icon"><RetweetOutlined style={{'fontSize':'25px'}}/>0</div>
            </div>
        </div>
    )
}

export default Post
