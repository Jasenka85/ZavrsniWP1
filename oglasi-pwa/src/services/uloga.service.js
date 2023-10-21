import http from "../http-common";

class UlogaDataService{

    async get(){
        return await http.get('/Korisnik');
    }

    async getBySifra(sifra) {
      return await http.get('/Korisnik/' + sifra);
    }



    async put(sifra,korisnik){
        const odgovor = await http.put('/Korisnik/Uloga/' + sifra, korisnik)
           .then(response => {
             return {ok:true, poruka: 'Uloga je uspješno promijenjena.'}; 
           })
           .catch(error => {
             return {ok:false, poruka: error.response.data}; 
           });
     
           return odgovor;
         }

    
}

export default new UlogaDataService();
