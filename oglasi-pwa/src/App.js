import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Izbornik from './components/izbornik.component';
import Pocetna from './components/pocetna.component';
import KontrolnaPloca from './components/kontrolnaploca.component';
import Korisnici from './components/korisnik/korisnici.component';
import KorisniciAdmini from './components/korisnik/administratori.component';
import PopisKorisnika from './components/korisnik/korisnicioglasi.component';
import DodajKorisnika from './components/korisnik/dodajKorisnika.component';
import PromijeniKorisnika from './components/korisnik/promijeniKorisnika.component';
import KorisniciUloga from './components/korisnik/ulogaKorisnika.component';
import PromijeniUlogu from './components/korisnik/promijeniUlogu.component';
import SviOglasi from './components/oglasi/svioglasi.component';
import OglasiKorisnika from './components/oglasi/oglasikorisnika.component';
import PromijeniOglas from './components/oglasi/promijeniOglas.component';
import Poklanjam from './components/oglasi/poklanjam.component';
import Trazim from './components/oglasi/trazim.component';
import NoviOglas from './components/oglasi/dodajOglas.component';
import NoviOglasAdmin from './components/oglasi/dodajOglasadmin.component';
import DodajnaListu from './components/crnalista/dodajnaListu.component';
import CrnaLista from './components/crnalista/crnalista.component'
import PromijeniListu from './components/crnalista/promijeniListu.component'

export default function App() {
  return (
    <Router>
      <Izbornik />
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/kontrolnaploca" element={<KontrolnaPloca />} />
        <Route path="/korisnici" element={<Korisnici />} />
        <Route path="/korisnici/admini" element={<KorisniciAdmini />} />
        <Route path="/korisnici/oglasi" element={<PopisKorisnika />} />
        <Route path="/korisnici/oglasi/:sifra" element={<OglasiKorisnika />} />
        <Route path="/korisnici/dodaj" element={<DodajKorisnika />} />
        <Route path="/korisnici/:sifra" element={<PromijeniKorisnika />} />
        <Route path="/korisnici/uloga" element={<KorisniciUloga />} />
        <Route path="/korisnici/uloga/:sifra" element={<PromijeniUlogu />} />
        <Route path="/oglasi" element={<SviOglasi />} />
        <Route path="/oglasi/:sifra" element={<PromijeniOglas />} />
        <Route path="/oglasi/poklanjam" element={<Poklanjam />} />
        <Route path="/oglasi/trazim" element={<Trazim />} />
        <Route path="/oglasi/novioglas" element={<NoviOglas />} />
        <Route path="/oglasi/novioglasadmin" element={<NoviOglasAdmin />} />
        <Route path="/crnalista/dodaj/:sifra" element={<DodajnaListu />} />
        <Route path="/crnalista" element={<CrnaLista />} />
        <Route path="/crnalista/:sifra" element={<PromijeniListu />} />
      </Routes>
     
    </Router>
  );
}

