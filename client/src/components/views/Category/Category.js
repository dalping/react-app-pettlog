import React from 'react'
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import './Category.css';

function Container(props) {

    const user = useSelector(state => state.user_reducer)

    //내 포스트 페이지로 이동하기
    const viewMyPost = () => {
        props.history.push(`/Post/${user.userData._id}`)
    }

    return (
        <div className="container">
            <span onClick={()=>{window.location.replace("/home")}}>Home</span>
            <span onClick={viewMyPost}>My Post</span>
            <span onClick={()=>{props.history.push('/message')}}>Message</span>
        </div>
    )
}

export default withRouter(Container)
