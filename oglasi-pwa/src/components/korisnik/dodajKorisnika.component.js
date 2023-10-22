import React, { Component } from "react";
import KorisnikDataService from "../../services/korisnik.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export default class DodajKorisnika extends Component {

  constructor(props) 
  {
    super(props);
    this.dodajKorisnika = this.dodajKorisnika.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async dodajKorisnika(korisnik) 
  {
    const odgovor = await KorisnikDataService.post(korisnik);
    if(odgovor.ok)
    {
      window.location.href='/korisnici';
    }
    else
    { 
      let poruke = '';
      for (const key in odgovor.poruka.errors) 
      {
        if (odgovor.poruka.errors.hasOwnProperty(key)) 
        {
          poruke += `${odgovor.poruka.errors[key]}` + '\n'; 
        }
      }
      alert(poruke);
    }
  }

  handleSubmit(e) 
  {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const podaci = new FormData(e.target);
    
    this.dodajKorisnika({
      ime: podaci.get('ime'),
      prezime: podaci.get('prezime'),
      email: podaci.get('email'),
      mobitel: podaci.get('mobitel'),
      grad: podaci.get('grad')
    });
  }

  render() { 
    return (
    <div className="mojdiv">
    <Container>  
      <h3 className="mojnaslov">Novi korisnik</h3>

      <div className="obrazacdiv">
      <Form onSubmit={this.handleSubmit}>
      <Row>
        <Col>  
          <Form.Group className="mb-3" controlId="ime">
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="ime" maxLength={50} required/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="prezime">
            <Form.Label>Prezime</Form.Label>
            <Form.Control type="text" name="prezime" maxLength={50} required/> 
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="text" name="email" maxLength={50} required/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="mobitel">
            <Form.Label>Broj mobitela</Form.Label>
            <Form.Control type="text" name="mobitel" maxLength={50}/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="grad">
            <Form.Label>Grad</Form.Label>
            <Form.Control type="text" name="grad" maxLength={50}/>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mojredak">
        <Col> </Col>
        <Col>
          <Link className="btn btn-danger gumb" to={`/korisnici`}>Odustani</Link>
        </Col>
        <Col>
          <Button variant="primary" className="gumb" type="submit">Dodaj korisnika</Button>
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