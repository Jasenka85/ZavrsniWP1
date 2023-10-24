import React, { Component } from "react";
import PorukeDataService from '../../services/poruke.service';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import moment from 'moment';

export default class ProcitajPoruku extends Component {

  constructor(props)
  {
      super(props);
      this.state = { poruka: {} };
  }
  
  componentDidMount()
  {
      this.dohvatiPoruku();
  }

  async dohvatiPoruku() {
    let href = window.location.href;
    let niz = href.split('/');
    await PorukeDataService.GetBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          poruka: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    
   const {poruka} = this.state;
   
   return (

    <div className="mojdiv">
    <Container>
    <Row><h3 className="mojnaslov">Poruka za oglas {poruka.sifra_oglasa}</h3></Row>
    
        <Row className="redakoglas">
        <Col></Col>
        <Col>
        <Card className="karticaporuka" >
          <ListGroup variant="flush">
          <ListGroup.Item><b>Naslov oglasa:</b> {poruka.oglas}</ListGroup.Item>
          <ListGroup.Item><b>Ime pošiljatelja:</b> {poruka.ime_posiljatelja}</ListGroup.Item>
          <ListGroup.Item><b>E-mail pošiljatelja:</b> {poruka.email_posiljatelja}</ListGroup.Item>
          <ListGroup.Item><b>Tekst poruke:</b> {poruka.tekst_poruke}</ListGroup.Item>
          <ListGroup.Item><b>Datum slanja:</b> {moment.utc(poruka.datum_poruke).format("DD.MM.YYYY.")}</ListGroup.Item>
          <Link className="btn btn-primary gumb" to={`/poruke`}>Povratak na poruke</Link>
          </ListGroup>
        </Card>
        </Col>
        <Col></Col>
        </Row>
    
      
    </Container>
    </div> 
    );
  }
}
