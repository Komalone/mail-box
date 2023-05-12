import { ListGroup, Card } from "react-bootstrap";
import './Mailinbox.css';
import { useEffect, useState } from "react";
import axios from "axios";

const Inbox=()=>{
    const [mailMsg, setMailMsg]= useState([])
    const [render, setRender]=useState(false);
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
    },[render])

    const unread= mailMsg.length;

    return (
        <div>
        <Card style={{margin: '50px 10px', minWidth: '900px'}}>
        <Card.Header><h3>Inbox 
            <span> ' There are {unread} unread mail '</span></h3></Card.Header>
            <Card.Body>
            <ListGroup variant="flush">
                { mailMsg.map((item)=>
                <div key={item.id}>
                <ListGroup.Item action as="li"
                className="d-flex  align-items-center">
                    <input type="checkbox"/>
                    <div className="ms-3 me-auto">
                        <div className="fw-bold">{item.from}</div>
                        {item.subject}
                         </div>
                </ListGroup.Item>
                </div>)}
            </ListGroup>
            </Card.Body>
        </Card>
        </div>
    );
}
export default Inbox;