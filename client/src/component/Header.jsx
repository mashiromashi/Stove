import React from 'react';
import './Header.css';

class Header extends React.Component {

    logout=()=>{
		let is_logout = window.confirm("Sure want to Logout?")
		if(is_logout){
            sessionStorage.removeItem("userdata")
            window.location.pathname='/';
		}
    }
    
    sidebar=()=>{
        return(
            <ul>
                <li className={window.location.pathname==="/admin" || window.location.pathname==="/"?'active':''}>
                    <a href={"/admin"}>Distributors</a>
                </li>
                <li className={window.location.pathname==="/user"?'active':''}>
                    <a href={"/user"}>User</a>
                </li>
                <li className={window.location.pathname==="/township"?'active':''}>
                    <a href={"/township"}>Township</a>
                </li>
                <li className={window.location.pathname==="/villages"?'active':''}>
                    <a href={"/villages"}>Village</a>
                </li>
                <li className={window.location.pathname==="/region"?'active':''}>
                    <a href={"/region"}>Region</a>
                </li>
                <li className={window.location.pathname==="/sales"?'active':''}>
                    <a href={"/sales"}>Sales</a>
                </li>
                <li className={window.location.pathname==="/stovetype"?'active':''}>
                    <a href={"/stovetype"}>Stove Type</a>
                </li>
                <li><a href='javascript:;' onClick={this.logout}><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
            </ul>
        )
    }
    render() {
        return (
            <div class="header">
                <div className='sidebar'>
                    {
                        this.sidebar()
                    }
                </div>
                <div className='logo'>
                    <img src="./assets/img/logo.png" alt=''/>
                </div>
                <div className='header-menu'>
                    <div>
                        {
                            this.sidebar()
                        }
                    </div>
                    <div>
                        <button className='fas fa-bars'></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
