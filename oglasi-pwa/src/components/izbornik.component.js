import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

import header from '../header_oglasi.jpg';
import logo from '../logo.svg';

export default class Izbornik extends Component{
 render(){
    const token = localStorage.getItem('Bearer');
    //console.log(token);
    const autoriziran =  token!==null && token!=='';
     //  console.log(autoriziran);

  return (
  <div className="mojdiv">
  <Container>
    <Row>
    <Image className="mojheader" src={header} fluid />
    </Row>
    
    <Row>
    <Navbar expand="lg" className="bg-body-tertiary">  
    <Navbar.Brand href="/"><img className="App-logo" src={logo} alt="logo"/>Oglasi za životinje
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    { autoriziran && 
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="/kontrolnaploca">Kontrolna ploča</Nav.Link>
      <Nav.Link href="/odjava">Odjava</Nav.Link>
    </Nav>
    </Navbar.Collapse>
    }
    { !autoriziran && 
        <Nav.Link href="/login">Prijava</Nav.Link>
    }
    </Navbar>
    </Row>


  </Container>
  </div>
  
        );
    }
}
