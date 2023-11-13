import React, { Component } from "react";
import OglasDataService from "../../services/oglas.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import moment from 'moment';

export default class PregledajOglas extends Component {

  constructor(props)
  {
      super(props);
      this.state = { oglas: {} };
  }
  
  componentDidMount()
  {
      this.dohvatiOglas();
  }

  async dohvatiOglas() {
    let href = window.location.href;
    let niz = href.split('/');
    await OglasDataService.GetCijeliBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          oglas: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    
   const {oglas} = this.state;
   
   return (

    <div className="mojdiv">
    <Container>
    <Row><h3 className="mojnaslov">{oglas.naslov}</h3></Row>
    
        <Row className="redakoglas">
        <Col>
        <Card className="fotografijaoglas" >
            <Card.Img variant="top" src={oglas.slika} />
          <Card.Body>
          <ListGroup variant="flush">
          
          <ListGroup.Item><b>Opis:</b> {oglas.opis}</ListGroup.Item>
          </ListGroup>
          </Card.Body>
          
        </Card>
        </Col>
        <Col>
        <Card className="karticaoglas" >
          <ListGroup variant="flush">
          <ListGroup.Item><b>Kategorija:</b> {oglas.kategorija===1 ? 'poklanjam' : 'tražim'}</ListGroup.Item>
          <ListGroup.Item><b>Datum objave:</b> {moment.utc(oglas.datum_objave).format("DD.MM.YYYY.")}</ListGroup.Item>
          <ListGroup.Item><b>Vrsta životinje:</b> {oglas.vrsta_zivotinje}</ListGroup.Item>
          <ListGroup.Item><b>Ime ili pasmina:</b> {oglas.ime_zivotinje}</ListGroup.Item>
          <ListGroup.Item><b>Dob životinje:</b> {oglas.dob_zivotinje}</ListGroup.Item>
          <ListGroup.Item><b>Spol životinje:</b> {oglas.spol_zivotinje}</ListGroup.Item>
          <ListGroup.Item><b>Kastriran:</b> {oglas.kastriran}</ListGroup.Item>
          <ListGroup.Item><b>Osoba za kontakt:</b> {oglas.ime}</ListGroup.Item>
          <ListGroup.Item><b>Mobitel:</b> {oglas.mobitel}</ListGroup.Item>
          <Link className="btn btn-success gumb"
                      to={`/poruke/posalji/${oglas.sifraOglasa}`}>Pošalji poruku</Link>
          </ListGroup>
        </Card>
        </Col>
        </Row>
    
      
    </Container>
    </div> 
    );
  }
}
