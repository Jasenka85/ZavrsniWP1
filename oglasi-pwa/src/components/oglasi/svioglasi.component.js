import React, { Component } from "react";
import OglasAdminDataService from "../../services/oglasadmin.service";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaEdit,FaTrash} from "react-icons/fa";
import moment from 'moment';

export default class SviOglasi extends Component{

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

async obrisiOglas(sifra){
    const odgovor = await OglasAdminDataService.delete(sifra);
    if(odgovor.ok){  window.location.href='/oglasi'; }
    else {	 alert(odgovor.poruka); }
    }


render(){
   const {oglasi} = this.state;
   return (
    <div className="mojdiv">
     <Container>
         
        <h3 className="mojnaslov">Popis svih oglasa</h3>
            
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
