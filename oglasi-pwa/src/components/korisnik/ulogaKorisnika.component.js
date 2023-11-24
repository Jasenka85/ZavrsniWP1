import React, { Component } from "react";
import UlogaDataService from "../../services/uloga.service";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaEdit,FaBan} from "react-icons/fa";


export default class UlogaKorisnika extends Component{

constructor(props)
{
    super(props);
    const token = localStorage.getItem('Bearer');
    if(token==null || token===''){
      window.location.href='/';
    }
    this.state = { korisnici:[] };
}

componentDidMount()
{
    this.dohvatiKorisnike();
}

async dohvatiKorisnike()
{
    await UlogaDataService.get()
    .then(response => {
    	this.setState({ korisnici: response.data });
    	console.log(response.data);
    })
    .catch(e=>{ 
        console.log(e);
    });
}



render(){
   const {korisnici} = this.state;
   return (
    <div className="mojdiv">
     <Container>
         
        <h3 className="mojnaslov">Uloge korisnika</h3>
            
        <Table striped bordered hover responsive>
         <thead>
          <tr>
          <th>Šifra</th> <th>Uloga</th> <th>Ime i prezime</th> <th>E-mail</th> <th>Grad</th> <th> </th>
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
              <td>{korisnik.grad}</td>
              <td>
                  <Link className="btn btn-primary gumb"
                      to={`/korisnici/uloga/${korisnik.sifra}`}><FaEdit/>
                  </Link>
                  <Link className="btn btn-danger gumb"
                      to={`/crnalista/dodaj/${korisnik.sifra}`}><FaBan/>
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
