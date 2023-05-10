import React from "react";
import './Mailinbox.css';
import {Nav, Navbar, Container} from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { authAction } from "../UI/auth-reducer";

const Header=()=>{
    const dispatch= useDispatch();
    const logoutHandler=()=>{
        dispatch(authAction.logout());
    }

return (
    <>
    <Navbar expand="lg">
            <Container>
            <Navbar.Brand href="/"><h2>Mail IN-Box</h2></Navbar.Brand>
                <Nav className="header">
                    <button><Nav.Link to="/">COMPOSE</Nav.Link></button>
                    <Nav.Link to="/">Inbox</Nav.Link>
                    {<Nav.Link to="/">Sent Mail</Nav.Link>}
                    {<button onClick={logoutHandler}>Logout</button>}
                    </Nav>
            </Container>
        </Navbar>
    </>
);
}
export default Header;