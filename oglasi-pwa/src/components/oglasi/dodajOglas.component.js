import React, { Component } from "react";
import OglasDataService from "../../services/oglas.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export default class DodajOglas extends Component {

  constructor(props) 
  {
    super(props);
    this.dodajOglas = this.dodajOglas.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async dodajOglas(oglas) 
  {
    const odgovor = await OglasDataService.post(oglas);
    if(odgovor.ok)
    {
      window.location.href='/';
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
    
    this.dodajOglas({
      ime: podaci.get('ime'),
      prezime: podaci.get('prezime'),
      email: podaci.get('email'),
      mobitel: podaci.get('mobitel'),
      grad: podaci.get('grad'),
      kategorija: podaci.get('kategorija'),
      naslov: podaci.get('naslov'),
      opis: podaci.get('opis'),
      vrsta_zivotinje: podaci.get('vrsta_zivotinje'),
      ime_zivotinje: podaci.get('ime_zivotinje'),
      spol_zivotinje: podaci.get('spol_zivotinje'),
      dob_zivotinje: podaci.get('dob_zivotinje'),
      kastriran: podaci.get('kastriran')
    });
  }

  render() { 
    return (
    <Container>
      <h2 className="mojnaslov">Novi oglas</h2>
      <Form onSubmit={this.handleSubmit}>

        <Row><h3>Podaci o korisniku</h3></Row>

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

      <Row><h3>Podaci o oglasu</h3></Row>

      <Row>
        <Col>  
          <Form.Group className="mb-3" controlId="kategorija">
            <Form.Label>Kategorija</Form.Label>
            <Form.Select>
            <option key={1} value="1">Poklanjam životinju</option>
            <option key={2} value="2">Tražim životinju</option>
          </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="naslov">
            <Form.Label>Naslov</Form.Label>
            <Form.Control type="text" name="naslov" maxLength={100} required/> 
          </Form.Group>
        </Col>
      </Row>

      <Row>
      <Form.Group className="mb-3" controlId="prezime">
            <Form.Label>Opis</Form.Label>
            <Form.Control type="text" name="opis" maxLength={1000} required/> 
          </Form.Group>
        </Row>

        <Row>
        <Col>
          <Form.Group className="mb-3" controlId="vrsta_zivotinje">
            <Form.Label>Vrsta životinje</Form.Label>
            <Form.Control type="text" name="vrsta_zivotinje" maxLength={50} required/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="ime_zivotinje">
            <Form.Label>Ime ili pasmina životinje</Form.Label>
            <Form.Control type="text" name="ime_zivotinje" maxLength={50}/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="dob_zivotinje">
            <Form.Label>Dob životinje</Form.Label>
            <Form.Control type="text" name="dob_zivotinje" maxLength={50}/>
          </Form.Group>
        </Col>
      </Row>

    <Row>
        <Col>  
          <Form.Group className="mb-3" controlId="spol_zivotinje">
            <Form.Label>Spol životinje</Form.Label>
            <Form.Control type="text" name="spol_zivotinje" maxLength={50} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="kastriran">
            <Form.Label>Kastriran?</Form.Label>
            <Form.Control type="text" name="kastriran" maxLength={50} /> 
          </Form.Group>
        </Col>
      </Row>


      <Row className="mojredak">
        <Col> </Col>
        <Col>
          <Link className="btn btn-danger gumb" to={`/`}>Odustani</Link>
        </Col>
        <Col>
          <Button variant="primary" className="gumb" type="submit">Objavi oglas</Button>
        </Col>
        <Col> </Col>
      </Row>
      </Form>
    </Container>
    );
  }
}
