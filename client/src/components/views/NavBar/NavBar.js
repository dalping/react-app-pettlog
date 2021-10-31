import React,{useState} from 'react'
import './Navbar.css';
import MenuRight from './MenuRight';
import {MenuOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom';

function NavBar(props) {

    const [OpenMenu, setOpenMenu] = useState(false)

    const openMenuHandler = () => {
        setOpenMenu(!OpenMenu)
    }

    return (
        <nav className="menu" style={{ position: 'fixed', zIndex:'10', width: '100%' }}> 
            <MenuOutlined className="openMenuIcon" onClick={openMenuHandler}/>
            <div className="menuLogo">
                <a href="/">Pettlog</a>
            </div>
            { OpenMenu && 
                    <div className="openMenu">
                        <div className="container">
                            <span>My Post</span>
                            <span>Subscribe</span>
                            <span>Message</span>
                            <span>Like Post</span>
                        </div>
                        <MenuRight/> 
                    </div>
            }
            <div className="menuContent">
                <div className="navbarLeft">
                </div>
                <div className="navbarRight">
                    <MenuRight/> 
                </div>
            </div>
        </nav>
    )
}

export default withRouter(NavBar)
