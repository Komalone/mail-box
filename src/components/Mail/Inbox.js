import { ListGroup, Card } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import { authAction } from "../UI/auth-reducer";
import './Mailinbox.css';
import { useEffect, useState } from "react";
import axios from "axios";

const Inbox=()=>{
    const [mailMsg, setMailMsg]= useState([])
    const [render, setRender]=useState(false);

    const dispatch= useDispatch()
    const isRead= useSelector(state=> state.auth.isRead)
    const [readMsg, setReadMsg]=useState({
        date:'' ,from:'', subject:'', message:''
    })
    const [tick, setTick]=useState(true);

    const fromEmail= localStorage.getItem("email").replace(/[@.]/g,"")
   // console.log(fromEmail);

    const userMailmsg=[];
    useEffect(()=>{
        axios.get(`https://cart-api-87764-default-rtdb.firebaseio.com/${fromEmail}/inbox.json`)
        .then(res=>{
            //console.log(res);
            if(res.data){
            for(const i in res.data){
                userMailmsg.push({id: i, ...res.data[i]});  
            } 
            console.log(userMailmsg);
            setMailMsg(userMailmsg)
            setRender(false);
        }
        })
        .catch((err)=>{console.log(err);})
    },[render]);

    const onRead=(item)=>{
        //console.log(item);
        dispatch(authAction.openReadMassage());
        setReadMsg({
            date: item.date,
            from: item.from,
            subject: item.subject,
            message: item.message
        })
        setTick(false);
    }
    const closeMailCard=()=>{
        dispatch(authAction.closeReadMassage());
    }

    const tickBox={
        backgroundColor: !tick ? '#fff' : 'aliceblue'
    }

    const unread= mailMsg.length;

    return (
        <div>
        <Card style={{margin: '50px 10px', minWidth: '900px', height: "550px"}}>
         {!isRead && <Card.Header><h3>Inbox 
            <span> ' There are total {unread} mail '</span></h3></Card.Header>}
            {!isRead && <Card.Body>
            <ListGroup variant="flush">
                { mailMsg.reverse().map((item)=>
                <div key={item.id} >
                <ListGroup.Item action 
                className="d-flex  align-items-center" style={tickBox} onClick={()=>onRead(item)}>
                    <input type="checkbox" />
                    <div className="ms-3 me-auto" >
                        <div className="fw-bold">{item.from}</div>
                        {item.subject}
                         </div>
                </ListGroup.Item>
                </div>)}
            </ListGroup>
            </Card.Body>}
            {isRead && <Card.Header><h3>{readMsg.subject}</h3>
            <button onClick={closeMailCard}>X</button></Card.Header>}
            {isRead &&
                <Card.Body>
                    <Card.Subtitle>Email sent by: {readMsg.from} </Card.Subtitle>
                    <Card.Subtitle>On: {readMsg.date} </Card.Subtitle>
                    <Card.Text>{readMsg.message}</Card.Text>
                    
                </Card.Body>
                
            }
        </Card>
        </div>
    );
}
export default Inbox;