import { ListGroup, Card, Button, CloseButton } from "react-bootstrap";
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

    const fromEmail= localStorage.getItem("email").replace(/[@.]/g,"")
   // console.log(fromEmail);

    const userMailmsg=[];

    useEffect(()=>{

        axios.get(`https://cart-api-87764-default-rtdb.firebaseio.com/${fromEmail}/inbox.json`)
        .then(res=>{
            //console.log(res.data);
            if(res.data){
            for(const i in res.data){
                userMailmsg.push({id: i, ...res.data[i]});  
            } 
            setMailMsg(userMailmsg)
            setRender(false);
        }
        })
        .catch((err)=>{console.log(err);})

    },[render, fromEmail]);

    const onRead=(item)=>{
        //console.log(item.id);
        axios.put(`https://cart-api-87764-default-rtdb.firebaseio.com/${fromEmail}/inbox/${item.id}.json`,
        {read: true, ...item})
        .then((res)=>{console.log(res)})
        dispatch(authAction.openReadMassage());
        setReadMsg({
            date: item.date,
            from: item.from,
            subject: item.subject,
            message: item.message
        });
        setRender(prev=>!prev);
    }
    const closeMailCard=()=>{
        dispatch(authAction.closeReadMassage());
    }

    const deleteHandler=(id)=>{
        console.log(id)
        axios.delete(`https://cart-api-87764-default-rtdb.firebaseio.com/${fromEmail}/inbox/${id}.json`)
        .then((res)=>{
            console.log("delete mail")
            setRender((prev)=> !prev);
        })
    }


    const unread= mailMsg.reduce(
        (count, item)=>{
            if(!item.read){
                return count+1;
            }
            return count;
        },0);


    return (
        <div>
        <Card style={{margin: '50px 10px', minWidth: '900px', height: "550px"}}>
         {!isRead && <Card.Header><h3>Inbox 
            <span> ' {unread} unread mail '</span></h3></Card.Header>}
            {!isRead && <Card.Body>
            <ListGroup variant="flush" as="ol">
                { mailMsg.reverse().map((item)=>
                <div key={item.id} >
                <ListGroup.Item action 
                className="d-flex  align-items-center" style={{ backgroundColor: (item.read) ? "#fff" : "aliceblue"}} >
                    <input type="checkbox" />
                    <div className="ms-3 me-auto" onClick={()=>onRead(item)}>
                        <div className="fw-bold">{item.from}</div>
                        {item.subject}
                         </div>
                    <Button variant="danger" onClick={()=>deleteHandler(item.id)}> Delete</Button>
                </ListGroup.Item>
                
                </div>)}
            </ListGroup>
            </Card.Body>}
            {isRead && <Card.Header><h3>{readMsg.subject}</h3>
            <CloseButton  style={{height: "auto", opacity:"inherit"}} onClick={closeMailCard}/>
                    </Card.Header>}
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