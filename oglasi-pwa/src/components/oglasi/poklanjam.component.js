import React, { Component } from "react";
import PoklanjamDataService from "../../services/poklanjam.service";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from 'moment';
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

    <div className="mojdiv">
     <Container>
         
        <h3 className="mojnaslov">Oglasi - poklanjam životinju</h3>
            
        <Table striped bordered hover responsive>
         <thead>
          <tr>
          <th>Fotografija</th>  <th>Naslov</th> <th>Vrsta životinje</th> <th>Grad</th> <th>Datum objave</th>
          </tr>
         </thead>
         <tbody>
         {
            poklanjam && poklanjam.map((oglas,index)=>(
            <tr key={index}>
              <td><Image src={nemafoto} className="fotkaoglas" /></td>
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
