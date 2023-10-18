import React, { Component } from "react";
import KorisnikDataService from "../../services/korisnik.service";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaEdit,FaTrash} from "react-icons/fa";


export default class Korisnici extends Component{

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
if(odgovor.ok){  this.dohvatiKorisnike(); }
else {	 alert(odgovor.poruka); }
}

render(){
   const {korisnici} = this.state;
   return (
    <div className="mojdiv">
     <Container>
         
        <h3 className="mojnaslov">Pregled korisnika</h3>
            
        <Table striped bordered hover responsive>
         <thead>
          <tr>
          <th>Šifra</th> <th>Uloga</th> <th>Ime i prezime</th> <th>E-mail</th> <th>Broj mobitela</th> <th>Grad</th> <th> </th>
          </tr>
         </thead>
         <tbody>
         {
            korisnici && korisnici.map((korisnik,index)=>(
            <tr key={index}>
              <td>{korisnik.sifra}</td> 
              <td>{korisnik.uloga}</td>
              <td>{korisnik.ime} {korisnik.prezime}</td>
              <td>{korisnik.email}</td>
              <td>{korisnik.mobitel}</td>
              <td>{korisnik.grad}</td>
              <td>
                  <Link className="btn btn-primary gumb"
                      to={`/korisnici/${korisnik.sifra}`}><FaEdit/>
                  </Link>
                  <Button variant="danger" className="gumb"
                       onClick={()=>this.obrisiKorisnika(korisnik.sifra)}>
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
