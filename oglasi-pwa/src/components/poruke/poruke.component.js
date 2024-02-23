import React, { Component } from "react";
import PorukeDataService from "../../services/poruke.service";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaEnvelopeOpen,FaTrash} from "react-icons/fa";
import moment from "moment";

export default class SvePoruke extends Component{

constructor(props)
{
    super(props);
    this.state = { poruke:[] };
}

componentDidMount()
{
    this.dohvatiPoruke();
}

async dohvatiPoruke()
{
    await PorukeDataService.get()
    .then(response => {
    	this.setState({ poruke: response.data });
    	console.log(response.data);
    })
    .catch(e=>{ 
        console.log(e);
    });
}

async obrisiPoruku(sifra){
    const odgovor = await PorukeDataService.delete(sifra);
    if(odgovor.ok){  window.location.href='/poruke'; }
    else { alert(odgovor.poruka); }
    }


render(){
   const {poruke} = this.state;
   return (
    <div className="mojdiv">
     <Container>
         
        <h3 className="mojnaslov">Popis svih poruka</h3>
            
        <Table striped bordered hover responsive>
         <thead>
          <tr>
            <th>Šifra poruke</th> <th>Šifra oglasa</th>  <th>Ime pošiljatelja</th> <th>E-mail</th> <th>Datum</th>
          </tr>
         </thead>
         <tbody>
         {
            poruke && poruke.length>0 && poruke.map((poruka,index)=>(
            <tr key={index}>
              <td>{poruka.sifra}</td> 
              <td>{poruka.sifra_oglasa}</td>
              <td>{poruka.ime_posiljatelja}</td>
              <td>{poruka.email_posiljatelja}</td>
              <td>{moment.utc(poruka.datum_poruke).format("DD.MM.YYYY.")}</td>
              <td>
                <Link className="btn btn-primary gumb"
                      to={`/poruke/${poruka.sifra}`}><FaEnvelopeOpen/>
                </Link>
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
