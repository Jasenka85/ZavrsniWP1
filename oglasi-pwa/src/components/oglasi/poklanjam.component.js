import React, { Component } from "react";
import PoklanjamDataService from "../../services/poklanjam.service";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import nemafoto from '../nemafoto.jpg';

export default class Poklanjam extends Component{

constructor(props)
{
    super(props);
    this.state = { poklanjam:[] };
}

componentDidMount()
{
    this.dohvatiPoklanjam();
}

async dohvatiPoklanjam()
{
    await PoklanjamDataService.get()
    .then(response => {
    	this.setState({ poklanjam: response.data });
    	console.log(response.data);
    })
    .catch(e=>{ 
        console.log(e);
    });
}


render(){
   const {poklanjam} = this.state;
   return (
     <Container>
         
        <h2 className="mojnaslov">Oglasi - poklanjam životinju</h2>
            
        <Table striped bordered hover responsive>
         <thead>
          <tr>
          <th>Fotografija</th>  <th>Naslov</th> <th>Opis</th> <th>Vrsta životinje</th> <th>Grad</th>
          </tr>
         </thead>
         <tbody>
         {
            poklanjam && poklanjam.map((oglas,index)=>(
            <tr key={index}>
              <td><Image src={nemafoto} className="fotkaoglas" /></td>
              <td>{oglas.naslov}</td> 
              <td>{oglas.opis}</td>
              <td>{oglas.vrsta_zivotinje}</td>
              <td>{oglas.grad}</td>
              
           </tr>
         ))}
         </tbody>
      </Table>
  </Container>
        );
    }
}
