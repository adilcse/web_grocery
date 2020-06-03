import React from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { AiFillCaretRight } from 'react-icons/ai';
const ViewProfile=(props)=>{
    const details=[
      {
        label: "Mobile no",
        data: props.fullAddress.mobile
      },
      {
        label: "Pincode",
        data: props.fullAddress.pin
      },
      {
        label: "Locality",
        data: props.fullAddress.locality
      },
      {
        label: "City/Distict/Town",
        data: props.fullAddress.city
      },
      {
        label: "State",
        data: props.fullAddress.state
      },
      {
        label: "Address",
        data: props.fullAddress.address
      }
    ];
return(
    <Col className="border" lg="5">
    <Row>
    <Form className="col pl-3">
      {details.map((element,i)=>{
        return(
          <div key={i}>
            <Form.Label>{element.label}</Form.Label>
            <Form.Control style={{marginBottom:"20px"}} className="border-bottom text-center" plaintext readOnly value={element.data?element.data:'Uknown'} />
          </div>
        )
      })
      }
    </Form>
    </Row>
    <Row className="text-left" style={{marginBottom:"20px"}}>
    <Button variant="secondary" size="lg" block onClick={()=>props.showPayment(!props.status)}>Payment Option <AiFillCaretRight/></Button>
    </Row>
  </Col>
)
}
export default ViewProfile;
