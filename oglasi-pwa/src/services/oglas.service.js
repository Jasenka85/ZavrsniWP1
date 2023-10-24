import http from "../http-common";

class OglasDataService{

    
    async post(oglas){
        const odgovor = await http.post('/Oglasi/CijeliOglas', oglas)
           .then(response => {
             return {ok:true, poruka: 'Oglas uspješno unesen.'}; 
           })
           .catch(error => {
             return {ok:false, poruka: error.response.data}; 
           });
           return odgovor;
    }

    async OglasiKorisnika(sifra) {
      return await http.get('/Oglasi/Korisnik/' + sifra);
    }

    async delete(sifra){
      const odgovor = await http.delete('/Oglasi/' + sifra)
      .then(response => {
          return {ok: true, poruka: 'Oglas uspješno obrisan'};
      })
      .catch(e=>{
          return {ok: false, poruka: e.response.data};
      });
      return odgovor;
  }

}

export default new OglasDataService();
