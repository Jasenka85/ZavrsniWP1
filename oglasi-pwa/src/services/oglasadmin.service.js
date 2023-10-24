import http from "../http-common";

class OglasAdminDataService{

    
    async get(){
      return await http.get('/Oglasi');
    }

    async getBySifra(sifra) {
      return await http.get('/Oglasi/' + sifra);
    }

    async post(oglas){
        const odgovor = await http.post('/Oglasi', oglas)
           .then(response => {
             return {ok:true, poruka: 'Oglas uspješno unesen.'}; 
           })
           .catch(error => {
             return {ok:false, poruka: error.response.data}; 
           });
           return odgovor;
    }

    async put(sifra,oglas){
      const odgovor = await http.put('/Oglasi/' + sifra, oglas)
         .then(response => {
           return {ok:true, poruka: 'Oglas uspješno promijenjen.'}; 
         })
         .catch(error => {
           return {ok:false, poruka: error.response.data}; 
         });
         return odgovor;
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

export default new OglasAdminDataService();