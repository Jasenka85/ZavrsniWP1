import http from "../http-common";

class ListaDataService{

    async get(){
        return await http.get('/Crna_lista');
    }

    async getBySifra(sifra) {
      return await http.get('/Crna_lista/' + sifra);
    }

    async post(lista){
      const odgovor = await http.post('/Crna_lista', lista)
         .then(response => {
           return {ok:true, poruka: 'Korisnik je stavljen na crnu listu.'}; 
         })
         .catch(error => {
           return {ok:false, poruka: error.response.data}; 
         });
         return odgovor;
    }



    async put(sifra,lista){
        const odgovor = await http.put('/Crna_lista/' + sifra, lista)
           .then(response => {
             return {ok:true, poruka: 'Unos u crnoj listi uspješno promijenjen.'}; 
           })
           .catch(error => {
             return {ok:false, poruka: error.response.data}; 
           });
     
           return odgovor;
         }


         async delete(sifra){
          const odgovor = await http.delete('/Crna_lista/' + sifra)
          .then(response => {
              return {ok: true, poruka: 'Korisnik je izbrisan sa crne liste'};
          })
          .catch(e=>{
              return {ok: false, poruka: e.response.data};
          });
          return odgovor;
      }

    
}

export default new ListaDataService();