import React, { Component } from "react";
import PorukeDataService from "../../services/poruke.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export default class PosaljiPoruku extends Component {

  constructor(props) 
  {
    super(props);
    this.posaljiPoruku = this.posaljiPoruku.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { sifraoglasa:0 };
  }

  async posaljiPoruku(poruka) 
  {
    const odgovor = await PorukeDataService.post(poruka);
    if(odgovor.ok)
    {
      window.location.href='/';
    }
    else
    { 
      console.log(odgovor);
    }
  }

  handleSubmit(e) 
  {
    // Prevent the browser from reloading the page
    e.preventDefault();

    let href = window.location.href;
    let niz = href.split('/'); 
    const sifraoglasa = niz[niz.length-1];

    // Read the form data
    const podaci = new FormData(e.target);
    
    this.posaljiPoruku({
      sifra_oglasa: sifraoglasa,
      ime_posiljatelja: podaci.get('ime_posiljatelja'),
      email_posiljatelja: podaci.get('email_posiljatelja'),
      tekst_poruke: podaci.get('tekst_poruke')
    });
  }

  render() { 
    return (
    <div className="mojdiv">
    <Container>  
      <h3 className="mojnaslov">Pošalji poruku</h3>

      <div className="obrazacdiv">
      <Form onSubmit={this.handleSubmit}>
      <Row>
        <Col>  
          <Form.Group className="mb-3" controlId="ime_posiljatelja">
            <Form.Label>Vaše ime:</Form.Label>
            <Form.Control type="text" name="ime_posiljatelja" maxLength={50} required/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="email_posiljatelja">
            <Form.Label>Vaš e-mail:</Form.Label>
            <Form.Control type="text" name="email_posiljatelja" maxLength={50} required/> 
          </Form.Group>
        </Col>
      </Row>

      <Row>
          <Form.Group className="mb-3" controlId="tekst_poruke">
            <Form.Label>Tekst poruke:</Form.Label>
            <Form.Control type="text" name="tekst_poruke" maxLength={1000} required/>
          </Form.Group>
      </Row>
      <Row className="mojredak">
        <Col> </Col>
        <Col>
          <Link className="btn btn-danger gumb" to={`/`}>Odustani</Link>
        </Col>
        <Col>
          <Button variant="primary" className="gumb" type="submit">Pošalji poruku</Button>
        </Col>
        <Col> </Col>
      </Row>
      </Form>
      </div>
    </Container>
    </div>
    );
  }
}