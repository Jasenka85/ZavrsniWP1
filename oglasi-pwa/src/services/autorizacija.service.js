import http from "../http-common";

class AutorizacijaDataService {

  async post(admin){
    const odgovor = await http.post('/Administrator/token', admin)
       .then(response => {
         return {ok:true, token: response.data}; 
       })
       .catch(error => {
         return {ok:false, poruka: 'Neispravno korisničko ime ili lozinka!'}; 
       });
       return odgovor;
    }    
}

export default new AutorizacijaDataService();