import React, { Component } from "react";
import AdminiDataService from "../../services/administratori.service";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class Administratori extends Component{

constructor(props)
{
    super(props);
    this.state = { administratori:[] };
}

componentDidMount()
{
    this.dohvatiAdmine();
}

async dohvatiAdmine()
{
    await AdminiDataService.get()
    .then(response => {
    	this.setState({ administratori: response.data });
    	console.log(response.data);
    })
    .catch(e=>{ 
        console.log(e);
    });
}


render(){
   const {administratori} = this.state;
   return (
    <div className="mojdiv">
     <Container>
         
        <h3 className="mojnaslov">Popis administratora i moderatora</h3>
            
        <Table striped bordered hover responsive>
         <thead>
          <tr>
          <th>Šifra</th> <th>Uloga</th> <th>Ime i prezime</th> <th>E-mail</th> <th>Broj mobitela</th> <th>Grad</th>
          </tr>
         </thead>
         <tbody>
         {
            administratori && administratori.map((korisnik,index)=>(
            <tr key={index}>
              <td>{korisnik.sifra}</td> 
              <td>{korisnik.nazivUloge}</td>
              <td>{korisnik.ime} {korisnik.prezime}</td>
              <td>{korisnik.email}</td>
              <td>{korisnik.mobitel}</td>
              <td>{korisnik.grad}</td>
              
           </tr>
         ))}
         </tbody>
      </Table>
      
  </Container>
  </div>
        );
    }
}
