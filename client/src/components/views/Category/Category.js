import React from 'react'
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Category.css';

function Container(props) {

    const user = useSelector(state => state.user_reducer)

    //내 포스트 페이지로 이동하기
    const viewMyPost = () => {
        props.history.push(`/Post/${user.userData._id}`)
    }

    return (
        <div className="container">
            <Link to="/home"><span>Home</span></Link>
            <span onClick={viewMyPost}>My Post</span>
            <span onClick={()=>{props.history.push('/message')}}>Message</span>
        </div>
    )
}

export default withRouter(Container)
