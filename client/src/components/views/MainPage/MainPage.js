import React from 'react'
import {withRouter} from  'react-router-dom';
import Post from '../Post/Post';

function LandingPage(props) {

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'100%',height:'100vh'}}>
            <div className="posts">
                <Post/>
            </div>
        </div>
    )
}

export default withRouter(LandingPage)

