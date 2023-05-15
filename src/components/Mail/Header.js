import React from "react";
import './Header.css';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../UI/auth-reducer";

const Header=()=>{
    const dispatch= useDispatch();
    const logoutHandler=()=>{
        dispatch(authAction.logout());
    }

return (
    <>
    <nav className="heading">
            <div >
            <h2>Mail IN-Box</h2>
                <ul className="navbar-nav mr-auto">
                    <li><Link to="/compose">COMPOSE</Link></li>
                    <li><Link to="/">Inbox</Link></li>
                    <li><Link to="/sentbox">Sent Mail</Link></li>
                    <li><button onClick={logoutHandler}>Logout</button></li>
                    </ul>
            </div>
        </nav>
    </>
);
}
export default Header;