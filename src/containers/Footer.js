import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {FaFacebookSquare, FaSnapchatSquare} from 'react-icons/fa';
import {MdEmail} from 'react-icons/md';
import { Transition } from 'semantic-ui-react';
import { IoIosEasel } from 'react-icons/io';
const ToTop= ()=>{
    document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
const Footer=()=>{
    return(
<Container className="justify-content-center" style={{width: '100%'}}>
    <Row className="border-top">
        <Col className="border-right">
        <Row><b><i>Contacts,</i></b></Row>
        <Row><FaFacebookSquare style={{color: 'blue', fontSize: '24px'}}/><b style={{color: 'grey'}}>Facebook</b></Row>
        <Row><FaSnapchatSquare style={{color: 'yellow', fontSize: '24px'}}/><b style={{color: 'grey'}}>Snapchat</b></Row>
        <Row><MdEmail style={{color: 'red', fontSize: '24px'}}/><b style={{color: 'grey'}}>Mail us or give some feedback</b></Row>
        </Col>
        <Col className="border-right"> Company details</Col>
        <Col><ul>
            <li><Button variant="link" onClick={()=>ToTop()}>To the top</Button></li>
            </ul></Col>
    </Row>
    <Row className="border-top"><Col className="text-center text-muted"><p>All right reserved<b>®</b>. Copyright <b>©</b></p></Col></Row>
</Container>
)}
export default Footer;