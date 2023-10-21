import React, { Component } from "react";
import OglasAdminDataService from "../../services/oglasadmin.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export default class DodajOglasAdmin extends Component {

  constructor(props) 
  {
    super(props);
    this.dodajOglasadmin = this.dodajOglasAdmin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async dodajOglasAdmin(oglas) 
  {
    const odgovor = await OglasAdminDataService.post(oglas);
    if(odgovor.ok)
    {
      window.location.href='/kontrolnaploca';
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
      sifra_korisnika: parseInt(podaci.get('sifra_korisnika')),
      kategorija: this.state.kategorija,
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
      <div className="mojdiv">
      <Container>
      <h3 className="oglasnaslov">Novi oglas</h3>
      
      <div className="obrazacdiv">
      <Form onSubmit={this.handleSubmit}>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="sifra_korisnika">
            <Form.Label>Šifra korisnika</Form.Label>
            <Form.Control type="text" name="sifra_korisnika" maxLength={10} required/> 
          </Form.Group>
        </Col>
        <Col>  
          <Form.Group className="mb-3" controlId="kategorija">
            <Form.Label>Kategorija</Form.Label>
            <Form.Select onChange={e => {
              this.setState({ kategorija: e.target.value});
            }}>
            <option value="1">Poklanjam životinju</option>
            <option value="2">Tražim životinju</option>
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
          <Form.Group className="mb-3" controlId="opis">
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
            <Form.Label>Kastriran</Form.Label>
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
      </div>
    </Container>
    </div>
    );
  }
}
