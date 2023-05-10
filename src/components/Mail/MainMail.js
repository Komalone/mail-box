import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Form, Button } from 'react-bootstrap'
import './Mailinbox.css';
import { EditorState } from "draft-js";
import axios from 'axios';

const MainMail=()=>{
    const [editorState, setEditor]= useState(EditorState.createEmpty())
    //console.log(editorState);
    const [email, setEmail]= useState('');
    const [subject, setSub]= useState('');

    const emailChange=(e)=>{
        setEmail(e.target.value)
    }
    const subjectChange=(e)=>{
        setSub(e.target.value)
    }

    const onSubmitHandler=(e)=>{
        e.preventDefault();
        console.log(email, subject);
        const toEmail= email.replace(/[@.]/g,"");
        const fromEmail= localStorage.getItem("email").replace(/[@.]/g,"");
        
        const message={
            to: email,
            subject: subject,
            message: editorState.getCurrentContent().getPlainText(),
            date: new Date().toLocaleDateString()
        }
        
       axios.post(`https://cart-api-87764-default-rtdb.firebaseio.com/${toEmail}/sentbox.json`, message)
       .then((res)=>{
        console.log(res);
        setEmail("");
        setSub("");
        setEditor("");
       }).catch((err)=>{
        console.log(err);
        alert(err);
       })

       axios.post(`https://cart-api-87764-default-rtdb.firebaseio.com/${fromEmail}/inbox.json`, message)
       .then((res)=>{
        console.log(res);
        setEmail("");
        setSub("");
        setEditor("");
       }).catch((err)=>{
        console.log(err);
        alert(err);
       })

    }

    return (
        <div>
            <form className="mailBox" onSubmit={onSubmitHandler} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>To</Form.Label>
            <Form.Control type="email" value={email} onChange={emailChange} placeholder="Enter email"  />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Subject</Form.Label>
            <Form.Control type="text" value={subject} onChange={subjectChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTextArea">
            <Editor placeholder="Enter message" 
            editorState={editorState}
            onEditorStateChange={setEditor}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Send
            </Button>
        </form>
        </div>
    );
}
export default MainMail