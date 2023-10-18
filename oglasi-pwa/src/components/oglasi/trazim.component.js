import React, { Component } from "react";
import TrazimDataService from "../../services/trazim.service";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from 'moment';

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
    <div className="mojdiv">
     <Container>
         
        <h3 className="mojnaslov">Oglasi - tražim životinju</h3>
            
        <Table striped bordered hover responsive>
         <thead>
          <tr>
            <th>Naslov</th>  <th>Vrsta životinje</th> <th>Grad</th> <th>Datum objave</th>
          </tr>
         </thead>
         <tbody>
         {
            trazim && trazim.map((oglas,index)=>(
            <tr key={index}>
              <td>{oglas.naslov}</td> 
              <td>{oglas.vrsta_zivotinje}</td>
              <td>{oglas.grad}</td>
              <td>{moment.utc(oglas.datum_objave).format("DD.MM.YYYY.")}</td>
           </tr>
         ))}
         </tbody>
      </Table>
  </Container>
  </div>
        );
    }
}
