import React from 'react'
import './Navbar.css';
import MenuRight from './MenuRight';


function NavBar() {

    return (
        <nav className="menu" style={{ position: 'fixed', zIndex:'10', width: '100%' }}>
            
                <div className="menu_logo">
                    <a href="/">Pettlog</a>
                </div>
                <div className="menu_content">
                    <div className="navbar_left">
                        {/* <div className="navbar_item">
                            <a href="/">Home</a>
                        </div> */}
                    </div>
                    <MenuRight/>
                    
                
            </div>
        </nav>
    )
}

export default NavBar
