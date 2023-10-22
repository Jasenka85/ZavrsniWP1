import React, { Component } from "react";
import ListaDataService from "../../services/crnalista.service";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import users from '../../users.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import moment from 'moment';

export default class PromijeniListu extends Component {

  constructor(props) {
    super(props);
    this.zapis = this.dohvatiZapis();
    this.promijeniZapis = this.promijeniZapis.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { zapis: {} };
  }

  async dohvatiZapis() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await ListaDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          zapis: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  async promijeniZapis(zapis) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await ListaDataService.put(niz[niz.length-1],zapis);
    if(odgovor.ok)
    {
      window.location.href='/crnalista';
    }
    else
    {
      console.log(odgovor);
    }
  }


  handleSubmit(e) 
  {
    e.preventDefault();

    const podaci = new FormData(e.target);
    
    this.promijeniZapis({
        razlog_blokiranja: podaci.get('razlog_blokiranja')
    });
  }

  

  render() {
    
   const {zapis} = this.state;

   return (
    <div className="mojdiv">
    <Container>
      <h3 className="mojnaslov">Promjena zapisa u crnoj listi</h3>

      <Row>
        <Col> </Col>
        <Col>
        <Card className="mojakartica" >
          <Card.Img variant="top" src={users} />
          <Card.Body>
            <Card.Title>{zapis.sifra_korisnika} {zapis.korisnik}</Card.Title>
            <Card.Text>
            <p>{zapis.email_korisnika}</p>
            <p>{zapis.mobitel_korisnika}</p>
            <p>{zapis.grad_korisnika}</p>
            <p>{moment.utc(zapis.datum_blokiranja).format("DD.MM.YYYY.")}</p>
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        <Col> </Col>
        </Row>
      

      <div className="obrazacdiv">
      <Form onSubmit={this.handleSubmit}>
      <Row>
          <Form.Group className="mb-3" controlId="razlog_blokiranja">
            <Form.Label>Razlog blokiranja</Form.Label>
            <Form.Control type="text" name="razlog_blokiranja" defaultValue={zapis.razlog_blokiranja} maxLength={1000} required/>
          </Form.Group>
      </Row>

      <Row className="mojredak">
        <Col> </Col>
        <Col>
          <Link className="btn btn-danger gumb" to={`/crnalista`}>Odustani</Link>
        </Col>
        <Col>
          <Button variant="primary" className="gumb" type="submit">Promijeni zapis</Button>
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
