import React, { Component } from "react";
import AdminiDataService from "../../services/administratori.service";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaClipboardList} from "react-icons/fa";


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
          <th>Šifra</th> <th>Uloga</th> <th>Ime i prezime</th> <th>E-mail</th> <th> </th> 
          </tr>
         </thead>
         <tbody>
         {
            administratori && administratori.length>0 && administratori.map((korisnik,index)=>(
            <tr key={index}>
              <td>{korisnik.sifra}</td> 
              <td>{korisnik.nazivUloge}</td>
              <td>{korisnik.ime} {korisnik.prezime}</td>
              <td>{korisnik.email}</td>
              <td>
                  <Link className="btn btn-primary gumb"
                      to={`/korisnici/oglasi/${korisnik.sifra}`}><FaClipboardList/>
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
