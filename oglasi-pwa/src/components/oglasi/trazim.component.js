import React, { Component } from "react";
import TrazimDataService from "../../services/trazim.service";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


export default class Trazim extends Component{

constructor(props)
{
    super(props);
    this.state = { trazim:[] };
}

componentDidMount()
{
    this.dohvatiTrazim();
}

async dohvatiTrazim()
{
    await TrazimDataService.get()
    .then(response => {
    	this.setState({ trazim: response.data });
    	console.log(response.data);
    })
    .catch(e=>{ 
        console.log(e);
    });
}


render(){
   const {trazim} = this.state;
   return (
     <Container>
         
        <h2 className="mojnaslov">Oglasi - tražim životinju</h2>
            
        <Table striped bordered hover responsive>
         <thead>
          <tr>
            <th>Naslov</th> <th>Opis</th> <th>Vrsta životinje</th> <th>Grad</th>
          </tr>
         </thead>
         <tbody>
         {
            trazim && trazim.map((oglas,index)=>(
            <tr key={index}>
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
