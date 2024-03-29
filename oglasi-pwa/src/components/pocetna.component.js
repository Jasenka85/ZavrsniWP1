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
        <div className="mojdiv">
        <Container>
        <Row><h3 className="mojnaslov">Dobrodošli na portal oglasa!</h3></Row>

        <div className="naslovna">
        <Row>Ovdje možete oglasiti ljubimca koji traži novi dom ili se javiti kao 
        potencijalni udomitelj. Ako ste zainteresirani za neku životinjicu iz oglasa, možete direktno 
        kontaktirati vlasnika. Stranica je namijenjena isključivo poklanjanju i udomljavanju životinja, 
        nikako njihovoj prodaji ili bilo kakvoj zamjeni!
        </Row>
        </div>

        <Row>
        <Col>
        <Card className="mojznak" >
          <Card.Body>
            <Card.Link href="/oglasi/poklanjam" className="mojlink">Oglasi POKLANJAM</Card.Link>
          </Card.Body>
          <Card.Img variant="top" src={poklanjam} style={{ width: '200px'}}/>
        </Card>
        </Col>

        <Col>
        <Card className="mojznak">
          <Card.Body>
            <Card.Link href="/oglasi/trazim" className="mojlink">Oglasi TRAŽIM</Card.Link>
          </Card.Body>
          <Card.Img variant="top" src={trazim} style={{ width: '200px'}} />
        </Card>
        </Col>

        <Col>
        <Card className="mojznak">
          <Card.Body>
            <Card.Link href="/oglasi/novioglas" className="mojlink">OBJAVI novi oglas</Card.Link>
          </Card.Body>
          <Card.Img variant="top" src={objavljujem} style={{ width: '200px'}}/>
        </Card>
        </Col>
      </Row>

      
      </Container>
      </div>
        );
    }
}
