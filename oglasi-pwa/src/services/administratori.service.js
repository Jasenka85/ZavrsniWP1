import http from "../http-common";

class AdminiDataService{

    async get(){
        return await http.get('/Korisnik/Admini');
    }

    

    
}

export default new AdminiDataService();