import React, { Component } from "react";
import FotografijaDataService from "../../services/fotografije.service";
import { Button, Container, Table } from "react-bootstrap";
import {FaTrash} from "react-icons/fa";


export default class Fotografije extends Component{

constructor(props)
{
    super(props);
    this.state = { fotografije:[] };
}

componentDidMount()
{
    this.dohvatiFotografije();
}

async dohvatiFotografije()
{
    await FotografijaDataService.get()
    .then(response => {
    	this.setState({ fotografije: response.data });
    	console.log(response.data);
    })
    .catch(e=>{ 
        console.log(e);
    });
}

async obrisiFotografiju(sifra){
const odgovor = await FotografijaDataService.delete(sifra);
if(odgovor.ok){  window.location.href='/fotografije'; }
else {	 alert(odgovor.poruka); }
}

render(){
   const {fotografije} = this.state;
   return (
    <div className="mojdiv">
     <Container>
         
        <h3 className="mojnaslov">Pregled fotografija</h3>
            
        <Table striped bordered hover responsive>
         <thead>
          <tr>
          <th>Šifra</th> <th>Naziv</th> <th>Link</th> <th>Šifra oglasa</th> <th>Oglas</th>  <th> </th>
          </tr>
         </thead>
         <tbody>
         {
            fotografije && fotografije.length>0 && fotografije.map((fotografija,index)=>(
            <tr key={index}>
              <td>{fotografija.sifra}</td> 
              <td>{fotografija.naziv}</td>
              <td>{fotografija.link}</td>
              <td>{fotografija.sifra_oglasa}</td>
              <td>{fotografija.oglas}</td>
              <td>
                  <Button variant="danger" className="gumb"
                       onClick={()=>this.obrisiFotografiju(fotografija.sifra)}>
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
