import http from "../http-common";

class PorukeDataService{

    async get(){
      return await http.get('/Poruke');
    }

    async GetBySifra(sifra) {
      return await http.get('/Poruke/' + sifra);
    }

    async post(novaporuka){
        const odgovor = await http.post('/Poruke', novaporuka)
           .then(response => {
             return {ok:true, poruka: 'Poruka uspješno poslana.'}; 
           })
           .catch(error => {
             return {ok:false, poruka: error.response.data}; 
           });
           return odgovor;
    }

    async PorukeOglasa(sifra) {
      return await http.get('/Poruke/Oglas/' + sifra);
    }

    async delete(sifra){
      const odgovor = await http.delete('/Poruke/' + sifra)
      .then(response => {
          return {ok: true, poruka: 'Poruka uspješno obrisana'};
      })
      .catch(e=>{
          return {ok: false, poruka: e.response.data};
      });
      return odgovor;
  }

}

export default new PorukeDataService();
