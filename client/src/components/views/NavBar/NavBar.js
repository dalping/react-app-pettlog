import React,{useState, useEffect} from 'react'
import './Navbar.css';
import MenuRight from './MenuRight';
import {MenuOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom';
import Category from '../Category/Category';

function NavBar(props) {

    const [OpenMenu, setOpenMenu] = useState(false)

    useEffect(() => {
        return () => {
            setOpenMenu(false)
        }
    }, [])

    const openMenuHandler = () => {
        setOpenMenu(!OpenMenu)
    }

    return (
        <nav className="menu" style={{ position: 'fixed', zIndex:'10', width: '100%' }}> 
            <MenuOutlined className="openMenuIcon" onClick={openMenuHandler}/>
            <div className="menuLogo">
                <span onClick={()=>{window.location.replace("/")}}>Pettlog</span>
            </div>
            { OpenMenu && 
                    <div className="openMenu">
                        <Category/>
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
