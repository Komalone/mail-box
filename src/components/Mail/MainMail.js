import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Form, Button } from 'react-bootstrap'
import './Mailinbox.css';

const MainMail=()=>{
    const [email, setEmail]= useState('');
    const [subject, setSub]= useState('');

    const emailChange=()=>{

    }

    const onSubmitHandler=()=>{

    }

    return (
        <div>
            <form className="mailBox" onSubmit={onSubmitHandler} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>To</Form.Label>
            <Form.Control type="email" placeholder="Enter email"  />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Subject</Form.Label>
            <Form.Control type="text"  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTextArea">
            <Editor placeholder="Enter message"/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Send
            </Button>
            <Button variant="primary" type="submit" >
                Close Compose
            </Button>
        </form>
        </div>
    );
}
export default MainMail