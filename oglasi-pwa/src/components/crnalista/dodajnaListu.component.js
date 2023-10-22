import React, { Component } from "react";
import ListaDataService from "../../services/crnalista.service";
import KorisnikDataService from "../../services/korisnik.service";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import users from '../../users.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";


export default class DodajnaListu extends Component {

  constructor(props) 
  {
    super(props);
    this.dohvatiKorisnika = this.dohvatiKorisnika.bind(this);
    this.dodajnaListu = this.dodajnaListu.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { korisnik: {}, sifrakorisnika:0 };
  }


  componentDidMount()
{
    this.dohvatiKorisnika();
}


  async dohvatiKorisnika() {
    let href = window.location.href;
    let niz = href.split('/');
    //rastavi link na dijelove prema / i spremi to u niz, uzmi zadnji element niza (šifra)
    //i nađi korisnika s tom šifrom 
    await KorisnikDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          korisnik: response.data,
          korisniksifra: niz[niz.length-1]
        });
      })
      .catch(e => {
        console.log(e);
      });
  }



  async dodajnaListu(lista) 
  {
    const odgovor = await ListaDataService.post(lista);
    if(odgovor.ok)
    {
      window.location.href='/korisnici/uloga';
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
    
    this.dodajnaListu({
      sifra_korisnika: this.state.korisniksifra,
      razlog_blokiranja: podaci.get('razlog_blokiranja')
    });
  }

  render() { 
    const { korisnik} = this.state;
    return (
    <div className="mojdiv">
    <Container>  
      <Row><h3 className="mojnaslov">Stavi korisnika na crnu listu</h3></Row>

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
          <Form.Group className="mb-3" controlId="razlog_blokiranja">
            <Form.Label>Razlog blokiranja</Form.Label>
            <Form.Control type="text" name="razlog_blokiranja" maxLength={1000} required/>
          </Form.Group>
      </Row>

      <Row className="mojredak">
        <Col> </Col>
        <Col>
          <Link className="btn btn-danger gumb" to={`/korisnici/uloga`}>Odustani</Link>
        </Col>
        <Col>
          <Button variant="primary" className="gumb" type="submit">Stavi na crnu listu</Button>
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