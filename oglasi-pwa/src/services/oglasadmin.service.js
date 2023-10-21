import http from "../http-common";

class OglasAdminDataService{

    
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

    
}

export default new OglasAdminDataService();