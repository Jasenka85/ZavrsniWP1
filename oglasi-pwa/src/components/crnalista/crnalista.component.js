import React, { Component } from "react";
import ListaDataService from "../../services/crnalista.service";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaEdit,FaTrash} from "react-icons/fa";
import moment from 'moment';

export default class CrnaLista extends Component{

constructor(props)
{
    super(props);
    const token = localStorage.getItem('Bearer');
    if(token==null || token===''){
      window.location.href='/';
    }
    this.state = { zapisi:[] };
}

componentDidMount()
{
    this.dohvatiListu();
}

async dohvatiListu()
{
    await ListaDataService.get()
    .then(response => {
    	this.setState({ zapisi: response.data });
    	console.log(response.data);
    })
    .catch(e=>{ 
        console.log(e);
    });
}

async obrisiizListe(sifra){
const odgovor = await ListaDataService.delete(sifra);
if(odgovor.ok){  window.location.href='/crnalista'; }
else {	 alert(odgovor.poruka); }
}

render(){
   const {zapisi} = this.state;
   
   return (
    <div className="mojdiv">
     <Container>
         
        <h3 className="mojnaslov">Pregled crne liste</h3>
            
        <Table striped bordered hover responsive>
         <thead>
          <tr>
          <th>Šifra</th> <th>Korisnik</th> <th>Šifra korisnika</th> <th>Razlog blokiranja</th> <th>Datum blokiranja</th> <th> </th>
          </tr>
         </thead>
         <tbody>
         {
            zapisi && zapisi.length>0 && zapisi.map((zapis,index)=>(
            <tr key={index}>
              <td>{zapis.sifra}</td> 
              <td>{zapis.korisnik}</td>
              <td>{zapis.sifra_korisnika}</td>
              <td>{zapis.razlog_blokiranja}</td>
              <td>{moment.utc(zapis.datum_blokiranja).format("DD.MM.YYYY.")}</td>
              <td>
                  <Link className="btn btn-primary gumb"
                      to={`/crnalista/${zapis.sifra}`}><FaEdit/>
                  </Link>
                  <Button variant="danger" className="gumb"
                       onClick={()=>this.obrisiizListe(zapis.sifra)}>
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
