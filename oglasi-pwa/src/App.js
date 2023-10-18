import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Izbornik from './components/izbornik.component';
import Pocetna from './components/pocetna.component';
import KontrolnaPloca from './components/kontrolnaploca.component';
import Korisnici from './components/korisnik/korisnici.component';
import KorisniciAdmini from './components/korisnik/administratori.component';
import DodajKorisnika from './components/korisnik/dodajKorisnika.component';
import PromijeniKorisnika from './components/korisnik/promijeniKorisnika.component';
import Poklanjam from './components/oglasi/poklanjam.component';
import Trazim from './components/oglasi/trazim.component';
import NoviOglas from './components/oglasi/dodajOglas.component';

export default function App() {
  return (
    <Router>
      <Izbornik />
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/kontrolnaploca" element={<KontrolnaPloca />} />
        <Route path="/korisnici" element={<Korisnici />} />
        <Route path="/korisnici/admini" element={<KorisniciAdmini />} />
        <Route path="/korisnici/dodaj" element={<DodajKorisnika />} />
        <Route path="/korisnici/:sifra" element={<PromijeniKorisnika />} />
        <Route path="/oglasi/poklanjam" element={<Poklanjam />} />
        <Route path="/oglasi/trazim" element={<Trazim />} />
        <Route path="/oglasi/novioglas" element={<NoviOglas />} />
      </Routes>
     
    </Router>
  );
}

