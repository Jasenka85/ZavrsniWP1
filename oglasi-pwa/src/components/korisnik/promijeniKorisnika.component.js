import React, { Component } from "react";
import KorisnikDataService from "../../services/korisnik.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export default class PromijeniKorisnika extends Component {

  constructor(props) {
    super(props);
    this.korisnik = this.dohvatiKorisnika();
    this.promijeniKorisnika = this.promijeniKorisnika.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { korisnik: {} };
  }

  async dohvatiKorisnika() {
    let href = window.location.href;
    let niz = href.split('/');
    //rastavi link na dijelove prema / i spremi to u niz, uzmi zadnji element niza (šifra)
    //i nađi korisnika s tom šifrom 
    await KorisnikDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          korisnik: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async promijeniKorisnika(korisnik) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await KorisnikDataService.put(niz[niz.length-1],korisnik);
    if(odgovor.ok)
    {
      window.location.href='/korisnici';
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

    // Read the form data
    const podaci = new FormData(e.target);
    
    this.promijeniKorisnika({
      ime: podaci.get('ime'),
      prezime: podaci.get('prezime'),
      email: podaci.get('email'),
      mobitel: podaci.get('mobitel'),
      grad: podaci.get('grad')
    });
  }

  

  render() {
    
   const { korisnik} = this.state;

   return (
    <Container>
      <h2 className="mojnaslov">Promjena korisnika</h2>
      <Form onSubmit={this.handleSubmit}>
      <Row>
        <Col>  
          <Form.Group className="mb-3" controlId="ime">
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="ime" maxLength={50} defaultValue={korisnik.ime} required/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="prezime">
            <Form.Label>Prezime</Form.Label>
            <Form.Control type="text" name="prezime" maxLength={50} defaultValue={korisnik.prezime} required/> 
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="text" name="email" maxLength={50} defaultValue={korisnik.email} required/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="mobitel">
            <Form.Label>Broj mobitela</Form.Label>
            <Form.Control type="text" name="mobitel" maxLength={50}  defaultValue={korisnik.mobitel} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="grad">
            <Form.Label>Grad</Form.Label>
            <Form.Control type="text" name="grad" maxLength={50} defaultValue={korisnik.grad} />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mojredak">
        <Col> </Col>
        <Col>
          <Link className="btn btn-danger gumb" to={`/korisnici`}>Odustani</Link>
        </Col>
        <Col>
          <Button variant="primary" className="gumb" type="submit">Promijeni korisnika</Button>
        </Col>
        <Col> </Col>
      </Row>
      </Form>
    </Container>



 
    );
  }
}
