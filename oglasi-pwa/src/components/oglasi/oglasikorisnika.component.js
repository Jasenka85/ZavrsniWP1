import React, { Component } from "react";
import OglasDataService from "../../services/oglas.service";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaEdit,FaTrash} from "react-icons/fa";
import moment from 'moment';


export default class OglasiKorisnika extends Component{

    constructor(props) {
        super(props);
        this.dohvatiOglase = this.dohvatiOglase.bind(this);
        this.state = { oglasi: [] };
      }
    
      componentDidMount()
      {
          this.dohvatiOglase();
      }


    async dohvatiOglase() {
    let href = window.location.href;
    let niz = href.split('/');
    await OglasDataService.OglasiKorisnika(niz[niz.length-1])
      .then(response => {
        this.setState({
          oglasi: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  async obrisiOglas(sifra){
    const odgovor = await OglasDataService.delete(sifra);
    if(odgovor.ok){  window.location.href='/korisnici/oglasi'; }
    else {	 alert(odgovor.poruka); }
    }


  render(){
    const {oglasi} = this.state;
    return (
     <div className="mojdiv">
      <Container>
          
         <h3 className="mojnaslov">Svi oglasi korisnika</h3>
             
         <Table striped bordered hover responsive>
          <thead>
           <tr>
             <th>Šifra</th> <th>Naslov</th>  <th>Kategorija</th> <th>Datum objave</th> <th>Aktivan</th> <th>  </th>
           </tr>
          </thead>
          <tbody>
          {
             oglasi && oglasi.length>0 && oglasi.map((oglas,index)=>(
             <tr key={index}>
               <td>{oglas.sifra}</td> 
               <td>{oglas.naslov}</td>
               <td>{oglas.kategorija===1 ? 'poklanjam' : 'tražim'}</td>
               <td>{moment.utc(oglas.datum_objave).format("DD.MM.YYYY.")}</td>
               <td>{oglas.aktivan ? 'da' : 'ne'}</td>
               <td>
                   <Link className="btn btn-primary gumb"
                       to={`/oglasi/${oglas.sifra}`}><FaEdit/>
                   </Link>
                   <Button variant="danger" className="gumb"
                        onClick={()=>this.obrisiOglas(oglas.sifra)}>
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