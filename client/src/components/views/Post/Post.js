import React from 'react'
import {
    MessageOutlined,
    HeartOutlined,
    RetweetOutlined
  } from '@ant-design/icons';

function Post() {
    return (
        <div className="total" style={{"border":"1px solid gray",'borderRadius':'5px'}}>
            <div className="post">
                <div className="photo">
                    image
                </div>
                <div style={{'width':'300px','height':'300px','padding':'15px'}}>
                    <p className="title">추적추적 비가 내린다</p>
                    <p className="writer">romini</p>
                    <hr/>
                    <p>새벽에 빗소리 들으며 코딩하니 기분이 정말 좋다 ㅎㅎ

                        이런게 행복인가 싶다!
                    </p>
                    <p className="date">2022.10.02 Fri</p>
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
