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

    
}

export default new OglasDataService();
