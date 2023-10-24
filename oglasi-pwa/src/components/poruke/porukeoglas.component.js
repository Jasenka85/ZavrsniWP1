import React, { Component } from "react";
import OglasAdminDataService from "../../services/oglasadmin.service";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaEnvelopeOpen} from "react-icons/fa";

export default class PorukeOglasa extends Component{

constructor(props)
{
    super(props);
    this.state = { oglasi:[] };
}

componentDidMount()
{
    this.dohvatiOglase();
}

async dohvatiOglase()
{
    await OglasAdminDataService.get()
    .then(response => {
    	this.setState({ oglasi: response.data });
    	console.log(response.data);
    })
    .catch(e=>{ 
        console.log(e);
    });
}



render(){
   const {oglasi} = this.state;
   return (
    <div className="mojdiv">
     <Container>
         
        <h3 className="mojnaslov">Pregledaj poruke za oglas</h3>
            
        <Table striped bordered hover responsive>
         <thead>
          <tr>
            <th>Šifra</th> <th>Naslov</th>  <th>Kategorija</th> <th>Aktivan</th> <th>  </th>
          </tr>
         </thead>
         <tbody>
         {
            oglasi && oglasi.length>0 && oglasi.map((oglas,index)=>(
            <tr key={index}>
              <td>{oglas.sifra}</td> 
              <td>{oglas.naslov}</td>
              <td>{oglas.kategorija===1 ? 'poklanjam' : 'tražim'}</td>
              <td>{oglas.aktivan ? 'da' : 'ne'}</td>
              <td>
              <Link className="btn btn-primary gumb"
                      to={`/poruke/oglas/${oglas.sifra}`}><FaEnvelopeOpen/>
                </Link>
                  
              </td>
           </tr>
         ))}
         </tbody>
      </Table>
  </Container>
  </div>
        );
    }
}
