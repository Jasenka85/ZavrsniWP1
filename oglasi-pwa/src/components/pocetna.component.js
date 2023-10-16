import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import poklanjam from '../poklanjam.png';
import trazim from '../trazim.png';
import objavljujem from '../objavljujem.png';

export default class Pocetna extends Component{
    render(){
        return (
        <Container>
        <Row><h2 className="mojnaslov">Dobrodošli na portal oglasa!</h2></Row>
        <Row>
        <Col>
        <Card className="mojznak" >
          <Card.Img variant="top" src={poklanjam} />
          <Card.Body>
            <Card.Link href="/oglasi/poklanjam">Oglasi POKLANJAM</Card.Link>
          </Card.Body>
        </Card>
        </Col>

        <Col>
        <Card className="mojznak">
          <Card.Img variant="top" src={trazim} />
          <Card.Body>
            <Card.Link href="/oglasi/trazim">Oglasi TRAŽIM</Card.Link>
          </Card.Body>
        </Card>
        </Col>

        <Col>
        <Card className="mojznak">
          <Card.Img variant="top" src={objavljujem} />
          <Card.Body>
            <Card.Link href="/oglasi/novioglas">OBJAVI novi oglas</Card.Link>
          </Card.Body>
        </Card>
        </Col>
      </Row>
            </Container>
        );
    }
}
