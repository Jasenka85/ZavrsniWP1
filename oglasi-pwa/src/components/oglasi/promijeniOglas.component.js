import React, { Component } from "react";
import OglasAdminDataService from "../../services/oglasadmin.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import {Image} from 'react-bootstrap';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default class PromijeniOglas extends Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem('Bearer');
    if(token==null || token===''){
      window.location.href='/';
    }
    this.oglas = this.dohvatiOglas();
    this.promijeniOglas = this.promijeniOglas.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { oglas: {}, trenutnaSlika: "", novaSlika: "" };
  }

  async dohvatiOglas() {
    let href = window.location.href;
    let niz = href.split('/');
    await OglasAdminDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          oglas: response.data,
          trenutnaSlika: response.data.slika
        });
      })
      .catch(e => { console.log(e); });
  }

  async promijeniOglas(oglas) {
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await OglasAdminDataService.put(niz[niz.length-1],oglas);
    if(odgovor.ok) { window.location.href='/oglasi'; }
    else { console.log(odgovor); }
  }

  handleSubmit(e) 
  {
    e.preventDefault();

    const podaci = new FormData(e.target);
    
    var select = document.getElementById('kategorija');
    var vrijednost = select.options[select.selectedIndex].value;

    const { novaSlika} = this.state;
    var base64 = novaSlika;
    if(base64 !== "")
    { base64 = base64.replace('data:image/png;base64,', '');}

    this.promijeniOglas({
      aktivan: podaci.get('aktivan')==='on' ? true : false,
      kategorija: parseInt(vrijednost),
      naslov: podaci.get('naslov'),
      opis: podaci.get('opis'),
      vrsta_zivotinje: podaci.get('vrsta_zivotinje'),
      ime_zivotinje: podaci.get('ime_zivotinje'),
      spol_zivotinje: podaci.get('spol_zivotinje'),
      dob_zivotinje: podaci.get('dob_zivotinje'),
      kastriran: podaci.get('kastriran'),
      slika: base64
    });
  }

  
  _crop() {
    this.setState({
     slikaZaServer: this.cropper.getCroppedCanvas().toDataURL()
   });
 }

 onCropperInit(cropper) {
     this.cropper = cropper;
 }

 onChange = (e) => {
   e.preventDefault();
   let files;
   if (e.dataTransfer) { files = e.dataTransfer.files; } 
   else if (e.target) { files = e.target.files; }
   const reader = new FileReader();
   reader.onload = () => {
     this.setState({
       image: reader.result
     });
   };
   try { reader.readAsDataURL(files[0]);} 
   catch (error) {  }
 }

 spremiSlikuAkcija = () =>{
   const { slikaZaServer} = this.state;
   this.setState({ novaSlika: slikaZaServer, trenutnaSlika: slikaZaServer }); 
 };




  render() {
    
   const {oglas} = this.state;
   const { image} = this.state;
    const { slikaZaServer} = this.state;
    const { trenutnaSlika} = this.state;

   return (
    <div className="mojdiv">
    <Container>
      <h3 className="mojnaslov">Promjena oglasa</h3>
      <div className="poznat">
    <Row>
      <Col>
        <ListGroup horizontal>
        <ListGroup.Item>Šifra korisnika:</ListGroup.Item>
        <ListGroup.Item>{oglas.sifra_korisnika}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col>
      <ListGroup horizontal>
      <ListGroup.Item>Korisnik:</ListGroup.Item>
      <ListGroup.Item>{oglas.korisnik}</ListGroup.Item>
      </ListGroup>
      </Col>
      <Col></Col>
      </Row>
      </div>

      <div className="obrazacdiv">
      <Form onSubmit={this.handleSubmit}>
      <Row>
        <Col>  
          <Form.Group className="mb-3" controlId="kategorija">
            <Form.Label>Kategorija</Form.Label>
            <Form.Select defaultValue="{korisnik.uloga}" onChange={e => {
              this.setState({kategorija: e.target.value});
              }}>
            <option value="1">Poklanjam životinju</option>
            <option value="2">Tražim životinju</option>
          </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="naslov">
            <Form.Label>Naslov</Form.Label>
            <Form.Control type="text" name="naslov" maxLength={100} defaultValue={oglas.naslov} required/> 
          </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="aktivan">
            <Form.Check defaultChecked={oglas.aktivan} reverse label="Aktivan" name="aktivan"/>
        </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="opis">
            <Form.Label>Opis</Form.Label>
            <Form.Control type="text" name="opis" maxLength={1000} defaultValue={oglas.opis} required/> 
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="vrsta_zivotinje">
            <Form.Label>Vrsta životinje</Form.Label>
            <Form.Control type="text" name="vrsta_zivotinje" maxLength={50} defaultValue={oglas.vrsta_zivotinje} required/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="ime_zivotinje">
            <Form.Label>Ime ili pasmina životinje</Form.Label>
            <Form.Control type="text" name="ime_zivotinje" maxLength={50} defaultValue={oglas.ime_zivotinje}/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="dob_zivotinje">
            <Form.Label>Dob životinje</Form.Label>
            <Form.Control type="text" name="dob_zivotinje" maxLength={50} defaultValue={oglas.dob_zivotinje}/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>  
          <Form.Group className="mb-3" controlId="spol_zivotinje">
            <Form.Label>Spol životinje</Form.Label>
            <Form.Control type="text" name="spol_zivotinje" maxLength={50} defaultValue={oglas.spol_zivotinje}/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="kastriran">
            <Form.Label>Kastriran</Form.Label>
            <Form.Control type="text" name="kastriran" maxLength={50} defaultValue={oglas.kastriran}/> 
          </Form.Group>
        </Col>
      </Row> 

      <Row>
              <Col key="1">
                Trenutna slika<br />
                <Image src={trenutnaSlika} className="slika" fluid />
                </Col>
                <Col key="2">
                  Nova slika<br />
                <Image src={slikaZaServer} className="slika" fluid />
                </Col>
      </Row>
      <Row>
        <Col>
      <input type="file" onChange={this.onChange}  />
      </Col>
      <Col>
      <input type="button" onClick={this.spremiSlikuAkcija} value={"Spremi sliku"}  />
      </Col>
      </Row>
      <Row>
                <Cropper
                    src={image}
                    style={{ height: 400, width: "100%" }}
                    initialAspectRatio={1}
                    guides={true}
                    viewMode={1}
                    minCropBoxWidth={50}
                    minCropBoxHeight={50}
                    cropBoxResizable={false}
                    background={false}
                    responsive={true}
                    checkOrientation={false} 
                    crop={this._crop.bind(this)}
                    onInitialized={this.onCropperInit.bind(this)}
                />
      </Row>


      <Row className="mojredak">
        <Col></Col>
        <Col>
          <Link className="btn btn-danger gumb" to={`/oglasi`}>Odustani</Link>
        </Col>
        <Col>
          <Button variant="primary" className="gumb" type="submit">Promijeni oglas</Button>
        </Col>
        <Col></Col>
      </Row>
      </Form>
      </div>
    </Container>
    </div> 
    );
  }
}
