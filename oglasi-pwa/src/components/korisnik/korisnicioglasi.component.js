import React, { Component } from "react";
import KorisnikDataService from "../../services/korisnik.service";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaClipboardList} from "react-icons/fa";


export default class KorisniciOglasi extends Component{

constructor(props)
{
    super(props);
    this.state = { korisnici:[] };
}

componentDidMount()
{
    this.dohvatiKorisnike();
}

async dohvatiKorisnike()
{
    await KorisnikDataService.get()
    .then(response => {
    	this.setState({ korisnici: response.data });
    	console.log(response.data);
    })
    .catch(e=>{ 
        console.log(e);
    });
}

async obrisiKorisnika(sifra){
const odgovor = await KorisnikDataService.delete(sifra);
if(odgovor.ok){  window.location.href='/korisnici'; }
else {	 alert(odgovor.poruka); }
}

render(){
   const {korisnici} = this.state;
   return (
    <div className="mojdiv">
     <Container>
         
        <h3 className="mojnaslov">Pregledaj oglase korisnika</h3>
            
        <Table striped bordered hover responsive>
         <thead>
          <tr>
          <th>Šifra</th> <th>Uloga</th> <th>Ime i prezime</th> <th>E-mail</th> <th> </th>
          </tr>
         </thead>
         <tbody>
         {
            korisnici && korisnici.length>0 && korisnici.map((korisnik,index)=>(
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
