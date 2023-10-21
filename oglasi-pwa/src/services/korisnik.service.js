import http from "../http-common";

class KorisnikDataService{

    async get(){
        return await http.get('/Korisnik');
    }

    async getBySifra(sifra) {
      return await http.get('/Korisnik/' + sifra);
    }


    async delete(sifra){
        const odgovor = await http.delete('/Korisnik/' + sifra)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });
        return odgovor;
    }

    async post(korisnik){
        const odgovor = await http.post('/Korisnik', korisnik)
           .then(response => {
             return {ok:true, poruka: 'Korisnik uspješno unesen.'}; 
           })
           .catch(error => {
             return {ok:false, poruka: error.response.data}; 
           });
           return odgovor;
    }

    async put(sifra,korisnik){
        const odgovor = await http.put('/Korisnik/' + sifra, korisnik)
           .then(response => {
             return {ok:true, poruka: 'Korisnik uspješno promijenjen.'}; 
           })
           .catch(error => {
             return {ok:false, poruka: error.response.data}; 
           });
     
           return odgovor;
         }

    
}

export default new KorisnikDataService();
