import React, { Component } from "react";
import UlogaDataService from "../../services/uloga.service";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import users from '../../users.jpg';
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
      })
      .catch(e => {
        console.log(e);
      });
  }

  async promijeniUlogu(korisnik) {
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
    e.preventDefault();

    const podaci = new FormData(e.target);
    
    this.promijeniUlogu({
      uloga: this.state.uloga,
      ime: "nebitno",
      prezime: "nebitno",
      email: "nebitno",
      lozinka: podaci.get('lozinka'),
      mobitel: "nebitno",
      grad: "nebitno"
    });
  }

  

  render() {
    
   const { korisnik} = this.state;

   return (
    <div className="mojdiv">
    <Container>
      <Row><h3 className="mojnaslov">Promjena uloge korisnika</h3></Row>

      <Row>
        <Col> </Col>
        <Col>
        <Card className="mojakartica" >
          <Card.Img variant="top" src={users} />
          <Card.Body>
            <Card.Title>{korisnik.ime} {korisnik.prezime}</Card.Title>
            <Card.Text>
            <p>{korisnik.email}</p>
            <p>{korisnik.mobitel}</p>
            <p>{korisnik.grad}</p>
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        <Col> </Col>
        </Row>

        <div className="obrazacdiv">
        
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
          <Form.Group className="mb-3" controlId="lozinka">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control type="text" name="lozinka" maxLength={100}/>
            <Form.Text className="text-muted">Potrebna samo za administratora i moderatora</Form.Text>
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