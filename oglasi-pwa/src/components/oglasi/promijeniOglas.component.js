import React, { Component } from "react";
import OglasAdminDataService from "../../services/oglasadmin.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

export default class PromijeniOglas extends Component {

  constructor(props) {
    super(props);
    this.oglas = this.dohvatiOglas();
    this.promijeniOglas = this.promijeniOglas.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { oglas: {} };
  }

  async dohvatiOglas() {
    let href = window.location.href;
    let niz = href.split('/');
    await OglasAdminDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          oglas: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  async promijeniOglas(oglas) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await OglasAdminDataService.put(niz[niz.length-1],oglas);
    if(odgovor.ok)
    {
      window.location.href='/oglasi';
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
    
    var select = document.getElementById('kategorija');
    var vrijednost = select.options[select.selectedIndex].value;

    this.promijeniOglas({
      aktivan: podaci.get('aktivan')==='on' ? true : false,
      kategorija: parseInt(vrijednost),
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
    
   const {oglas} = this.state;
   
   return (
    <div className="mojdiv">
    <Container>
      <h3 className="mojnaslov">Promjena oglasa</h3>
      <div className="poznat">
    <Row>
      <Col>
        <ListGroup horizontal>
        <ListGroup.Item>Šifra korisnika:</ListGroup.Item>
        <ListGroup.Item>{oglas.sifra_korisnika}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col>
      <ListGroup horizontal>
      <ListGroup.Item>Korisnik:</ListGroup.Item>
      <ListGroup.Item>{oglas.korisnik}</ListGroup.Item>
      </ListGroup>
      </Col>
      <Col></Col>
      </Row>
      </div>

      <div className="obrazacdiv">
      <Form onSubmit={this.handleSubmit}>
      <Row>
        <Col>  
          <Form.Group className="mb-3" controlId="kategorija">
            <Form.Label>Kategorija</Form.Label>
            <Form.Select defaultValue="{korisnik.uloga}" onChange={e => {
              this.setState({kategorija: e.target.value});
              }}>
            <option value="1">Poklanjam životinju</option>
            <option value="2">Tražim životinju</option>
          </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="naslov">
            <Form.Label>Naslov</Form.Label>
            <Form.Control type="text" name="naslov" maxLength={100} defaultValue={oglas.naslov} required/> 
          </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="aktivan">
            <Form.Check defaultChecked={oglas.aktivan} reverse label="Aktivan" name="aktivan"/>
        </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="opis">
            <Form.Label>Opis</Form.Label>
            <Form.Control type="text" name="opis" maxLength={1000} defaultValue={oglas.opis} required/> 
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="vrsta_zivotinje">
            <Form.Label>Vrsta životinje</Form.Label>
            <Form.Control type="text" name="vrsta_zivotinje" maxLength={50} defaultValue={oglas.vrsta_zivotinje} required/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="ime_zivotinje">
            <Form.Label>Ime ili pasmina životinje</Form.Label>
            <Form.Control type="text" name="ime_zivotinje" maxLength={50} defaultValue={oglas.ime_zivotinje}/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="dob_zivotinje">
            <Form.Label>Dob životinje</Form.Label>
            <Form.Control type="text" name="dob_zivotinje" maxLength={50} defaultValue={oglas.dob_zivotinje}/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>  
          <Form.Group className="mb-3" controlId="spol_zivotinje">
            <Form.Label>Spol životinje</Form.Label>
            <Form.Control type="text" name="spol_zivotinje" maxLength={50} defaultValue={oglas.spol_zivotinje}/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="kastriran">
            <Form.Label>Kastriran</Form.Label>
            <Form.Control type="text" name="kastriran" maxLength={50} defaultValue={oglas.kastriran}/> 
          </Form.Group>
        </Col>
      </Row> 
      <Row className="mojredak">
        <Col></Col>
        <Col>
          <Link className="btn btn-danger gumb" to={`/oglasi`}>Odustani</Link>
        </Col>
        <Col>
          <Button variant="primary" className="gumb" type="submit">Promijeni oglas</Button>
        </Col>
        <Col></Col>
      </Row>
      </Form>
      </div>
    </Container>
    </div> 
    );
  }
}
