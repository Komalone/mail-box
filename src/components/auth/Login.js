import { useState, useRef } from 'react';
import './Login.css';
import image from '../../image/icon-512x512.png'
import { Card, Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { authAction } from '../UI/auth-reducer';
import { useNavigate } from 'react-router-dom';

const Login=()=>{
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const [isLogin, setIsLogin]= useState(true);
    const emailInput=useRef("");
    const passwordInput=useRef("");
    const confPswdInput=useRef("");

    const switchModeHandler=()=>{
        setIsLogin(prev => !prev);
    }
    const submitHandler=(e)=>{
        e.preventDefault();
    
        const enteredEmail=emailInput.current.value;
        const enteredPassword=passwordInput.current.value;
        let url;
        if(!isLogin && (enteredPassword !== confPswdInput.current.value)){
            return alert("Password is not same")
        }
        else if(isLogin){
            url= "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDd1udW03Q6zC24ia2xKuVRtJQhevjXgvs"
        }
        else{
            url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDd1udW03Q6zC24ia2xKuVRtJQhevjXgvs"
        }
        fetch(url,{
            method:'POST',
            body:JSON.stringify({
                email:enteredEmail,
                password:enteredPassword,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            if(res.ok){
    
                console.log("successfully login", res);
                alert("successfully login");
                let data= res.json();
                data.then((resp)=>{
                    console.log(resp);
                    dispatch(authAction.login({email: resp.email, token: resp.idToken}));
                    navigate('/');
                })
            }else{
                const data= res.json();
                data.then((err)=>{
                    alert(err.error.message);
                })
            }
        })
      };
      const myStyle={backgroundImage : `url(${image})`, backgroundSize: 'cover'}
    
    return (
        <div style={myStyle}>
        <Card className='form'>    
        <Card.Body >
        <Card.Title>{isLogin ? 'Sign In' : 'Sign Up'}</Card.Title>
       <Form onSubmit={submitHandler}>
       <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required ref={emailInput} />
      </Form.Group>
      <Form.Group controlId="pswd">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  required ref={passwordInput} />
      </Form.Group>
      {!isLogin && <Form.Group controlId="conPswd">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password"  required ref={confPswdInput} />
      </Form.Group>}
      <Button type='submit'>{isLogin ? 'Login' : 'Create Account'}</Button>
        </Form> 
       </Card.Body>
        <button onClick={switchModeHandler}>
        {isLogin ? "Don't Have Account? Sign Up " : 'Login with existing account'}
        </button>
    </Card>
        </div>
    );
}

export default Login;