import React, { Component } from "react";
import UlogaDataService from "../../services/uloga.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export default class PromjenaUloge extends Component {

  constructor(props) {
    super(props);
    this.korisnik = this.dohvatiKorisnika();
    this.promijeniUlogu = this.promijeniUlogu.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { korisnik: {} };
  }

  async dohvatiKorisnika() {
    let href = window.location.href;
    let niz = href.split('/');
    //rastavi link na dijelove prema / i spremi to u niz, uzmi zadnji element niza (šifra)
    //i nađi korisnika s tom šifrom 
    await UlogaDataService.getBySifra(niz[niz.length-1])
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

  async promijeniUlogu(korisnik) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await UlogaDataService.put(niz[niz.length-1],korisnik);
    if(odgovor.ok)
    {
      window.location.href='/korisnici/uloga';
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
    
    this.promijeniUlogu({
      uloga: this.state.uloga,
      ime: podaci.get('ime'),
      prezime: podaci.get('prezime'),
      email: podaci.get('email'),
      lozinka: podaci.get('lozinka'),
      mobitel: podaci.get('mobitel'),
      grad: podaci.get('grad'),
      //može se promijeniti samo uloga i lozinka, ostale promjene se ignoriraju (na backendu)
    });
  }

  

  render() {
    
   const { korisnik} = this.state;

   return (
    <div className="mojdiv">
    <Container>
      <h3 className="mojnaslov">Promjena uloge korisnika</h3>

      <div className="obrazacdiv">
      <p>Možete promijeniti samo ulogu i lozinku korisnika. Lozinka je potrebna samo za administratora i moderatora.</p>
      
      <Form onSubmit={this.handleSubmit}>
      <Row>
      <Col>  
          <Form.Group className="mb-3" controlId="uloga">
            <Form.Label>Uloga korisnika</Form.Label>
            <Form.Select onChange={e => {
              this.setState({ uloga: e.target.value});
            }}>
            <option value="0">korisnik</option>
            <option value="1">administrator</option>
            <option value="2">moderator</option>
          </Form.Select>
          </Form.Group>
        </Col>
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
          <Form.Group className="mb-3" controlId="lozinka">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control type="text" name="lozinka" maxLength={100}/>
          </Form.Group>
        </Col>
        </Row>
        <Row>
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
          <Link className="btn btn-danger gumb" to={`/korisnici/uloga`}>Odustani</Link>
        </Col>
        <Col>
          <Button variant="primary" className="gumb" type="submit">Promijeni ulogu korisnika</Button>
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
