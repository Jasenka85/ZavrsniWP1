import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import users from '../users.jpg';
import listing from '../oglas.png';
import imail from '../poruka.png';

export default class KontrolnaPloca extends Component{
  render(){
  return (
    <div className="mojdiv">
    <Container>
      <Row><h3 className="mojnaslov">Kontrolna ploča</h3></Row>
      <Row>
        <Col>
        <Card className="mojakartica" >
          <Card.Img variant="top" src={users} />
          <Card.Body>
            <Card.Title>Korisnici</Card.Title>
            <Card.Text>
            Izbornik za upravljanje s korisnicima
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item><Card.Link href="/korisnici">Pregled korisnika</Card.Link></ListGroup.Item>
            <ListGroup.Item><Card.Link href="/korisnici/dodaj">Dodavanje novog korisnika</Card.Link></ListGroup.Item>
            <ListGroup.Item><Card.Link href="/korisnici/admini">Administratori i moderatori</Card.Link></ListGroup.Item>
            <ListGroup.Item><Card.Link href="/korisnici/uloga">Promjena uloge i blokiranje</Card.Link></ListGroup.Item>
            <ListGroup.Item><Card.Link href="/crnalista">Crna lista</Card.Link></ListGroup.Item>
          </ListGroup>
          
        </Card>
        </Col>

        <Col>
        <Card className="mojakartica">
          <Card.Img variant="top" src={listing} />
          <Card.Body>
            <Card.Title>Oglasi</Card.Title>
            <Card.Text>
            Izbornik za upravljanje s oglasima
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item><Card.Link href="#">Pregled oglasa</Card.Link></ListGroup.Item>
            <ListGroup.Item><Card.Link href="#">Dodavanje novog oglasa</Card.Link></ListGroup.Item>
            <ListGroup.Item><Card.Link href="#">Aktivacija oglasa</Card.Link></ListGroup.Item>
            
          </ListGroup>
          
        </Card>
        </Col>

        <Col>
        <Card className="mojakartica">
          <Card.Img variant="top" src={imail} />
          <Card.Body>
            <Card.Title>Poruke</Card.Title>
            <Card.Text>
            Izbornik za upravljanje s porukama
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item><Card.Link href="#">Pregled poruka</Card.Link></ListGroup.Item>
            <ListGroup.Item><Card.Link href="#">Slanje poruka</Card.Link></ListGroup.Item>
            
            
          </ListGroup>
          
        </Card>
        </Col>
      </Row>
          </Container>
          </div>
      );
  }
}

