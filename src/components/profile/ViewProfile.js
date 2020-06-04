import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';
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
          <Row key={i}>
            <Form.Label>{element.label}</Form.Label>
            <Form.Control style={{marginBottom:"20px"}} className="border-bottom text-center" plaintext readOnly value={element.data?element.data:'Uknown'} />
          </Row>
        )
      })
      }
    </Form>
    </Row>
  </Col>
)
}
export default ViewProfile;
