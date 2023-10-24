import React, { Component } from "react";
import PorukeDataService from "../../services/poruke.service";
import { Button, Container, Table } from "react-bootstrap";
import {FaTrash} from "react-icons/fa";
import moment from "moment";

export default class ProcitajPorukeOglasa extends Component{

constructor(props)
{
    super(props);
    this.dohvatiPoruke = this.dohvatiPoruke.bind(this);
    this.state = { poruke:[] };
}

componentDidMount()
{
    this.dohvatiPoruke();
}

async dohvatiPoruke()
{
    let href = window.location.href;
    let niz = href.split('/');
    await PorukeDataService.PorukeOglasa(niz[niz.length-1])
    .then(response => {
    	this.setState({ poruke: response.data });
    })
    .catch(e=>{ 
        console.log(e);
    });
}

async obrisiPoruku(sifra){
    const odgovor = await PorukeDataService.delete(sifra);
    if(odgovor.ok){  window.location.href='/poruke/oglas'; }
    else { alert(odgovor.poruka); }
    }


render(){
   const {poruke} = this.state;
   return (
    <div className="mojdiv">
     <Container>
         
        <h3 className="mojnaslov">Pregledaj poruke za oglas </h3>
            
        <Table striped bordered hover responsive>
         <thead>
          <tr>
            <th>Šifra poruke</th>  <th>Ime pošiljatelja</th> <th>E-mail</th> <th>Tekst poruke</th> <th>Datum</th> <th>  </th>
          </tr>
         </thead>
         <tbody>
         {
            poruke && poruke.length>0 && poruke.map((poruka,index)=>(
            <tr key={index}>
              <td>{poruka.sifra}</td> 
              <td>{poruka.ime_posiljatelja}</td>
              <td>{poruka.email_posiljatelja}</td>
              <td>{poruka.tekst_poruke}</td>
              <td>{moment.utc(poruka.datum_poruke).format("DD.MM.YYYY.")}</td>
              <td>
                
                  <Button variant="danger" className="gumb"
                       onClick={()=>this.obrisiPoruku(poruka.sifra)}>
                       <FaTrash/>
                  </Button>
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
