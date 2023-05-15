import './Mailinbox.css';
import { ListGroup, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

const SentBox=()=>{
    const [mailMsg, setMailMsg]= useState([])
    const [render, setRender]=useState(false);

    const fromEmail= localStorage.getItem("email").replace(/[@.]/g,"")

    const userMailmsg=[];
    useEffect(()=>{
        axios.get(`https://cart-api-87764-default-rtdb.firebaseio.com/${fromEmail}/sentbox.json`)
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

    const deleteHandler=(id)=>{
        console.log(id)
        axios.delete(`https://cart-api-87764-default-rtdb.firebaseio.com/${fromEmail}/sentbox/${id}.json`)
        .then((res)=>{
            console.log("delete mail")
            setRender((prev)=> !prev);
        })
    }

    return(
        <div>
        <Card style={{margin: '50px 10px', minWidth: '900px', height: "550px"}}>
         <Card.Header><h3>SentBox </h3></Card.Header>
         <Card.Body>
            <ListGroup variant="flush">
                { mailMsg.reverse().map((item)=>
                <div key={item.id} >
                <ListGroup.Item action 
                className="d-flex  align-items-center" >
                    <input type="checkbox" />
                    <div className="ms-3 me-auto" >
                        <div className="fw-bold">{item.from}</div>
                        {item.subject}
                         </div>
                    <Button variant="danger" onClick={()=>deleteHandler(item.id)}> Delete</Button>
                </ListGroup.Item>
                
                </div>)}
            </ListGroup>
        </Card.Body>
        </Card>
        </div>
    );
}
export default SentBox;