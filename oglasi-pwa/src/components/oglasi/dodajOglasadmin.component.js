import React, { Component } from "react";
import OglasAdminDataService from "../../services/oglasadmin.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from "react-router-dom";
import {Image} from 'react-bootstrap';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default class DodajOglasAdmin extends Component {

  constructor(props) 
  {
    super(props);
    const token = localStorage.getItem('Bearer');
    if(token==null || token===''){
      window.location.href='/';
    }
    this.dodajOglasAdmin = this.dodajOglasAdmin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {trenutnaSlika: "/slike/nemaslike.png"};
  }

  async dodajOglasAdmin(oglas) 
  {
    const odgovor = await OglasAdminDataService.post(oglas);
    if(odgovor.ok)
    { window.location.href='/oglasi'; }
    else
    { console.log(odgovor); }
  }

  handleSubmit(e) 
  {
    e.preventDefault();

    const podaci = new FormData(e.target);

    var select = document.getElementById('kategorija');
    var vrijednost = select.options[select.selectedIndex].value;
    
    const { trenutnaSlika} = this.state;
    var base64 = trenutnaSlika;
    if(base64 !== "/slike/nemaslike.png")
    { base64 = base64.replace('data:image/png;base64,', '');}

    this.dodajOglasAdmin({
      sifra_korisnika: parseInt(podaci.get('sifra_korisnika')),
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
   this.setState({ trenutnaSlika: slikaZaServer }); 
 };



  render() { 
    
    const { image} = this.state;
    const { slikaZaServer} = this.state;
    const { trenutnaSlika} = this.state;

    return (
      <div className="mojdiv">
      <Container>
      <h3 className="oglasnaslov">Novi oglas</h3>
      
      <div className="obrazacdiv">
      <Form onSubmit={this.handleSubmit}>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="sifra_korisnika">
            <Form.Label>Šifra korisnika</Form.Label>
            <Form.Control type="text" name="sifra_korisnika" maxLength={10} required/> 
          </Form.Group>
        </Col>
        <Col>  
        <Form.Group className="mb-3" controlId="kategorija">
            <Form.Label>Kategorija</Form.Label>
            <Form.Select onChange={e => {
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
            <Form.Control type="text" name="naslov" maxLength={100} required/> 
          </Form.Group>
        </Col>
      </Row>

      <Row>
          <Form.Group className="mb-3" controlId="opis">
            <Form.Label>Opis</Form.Label>
            <Form.Control type="text" name="opis" maxLength={1000} required/> 
          </Form.Group>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="vrsta_zivotinje">
            <Form.Label>Vrsta životinje</Form.Label>
            <Form.Control type="text" name="vrsta_zivotinje" maxLength={50} required/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="ime_zivotinje">
            <Form.Label>Ime ili pasmina životinje</Form.Label>
            <Form.Control type="text" name="ime_zivotinje" maxLength={50}/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="dob_zivotinje">
            <Form.Label>Dob životinje</Form.Label>
            <Form.Control type="text" name="dob_zivotinje" maxLength={50}/>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>  
          <Form.Group className="mb-3" controlId="spol_zivotinje">
            <Form.Label>Spol životinje</Form.Label>
            <Form.Control type="text" name="spol_zivotinje" maxLength={50} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="kastriran">
            <Form.Label>Kastriran</Form.Label>
            <Form.Control type="text" name="kastriran" maxLength={50} /> 
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
      <input type="button" onClick={this.spremiSlikuAkcija} value={"Spremi sliku"} />
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
          <Button variant="primary" className="gumb" type="submit">Objavi oglas</Button>
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
