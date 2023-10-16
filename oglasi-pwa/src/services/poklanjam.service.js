import http from "../http-common";

class PoklanjamDataService{

    async get(){
        return await http.get('/Oglasi/Poklanjam');
    }

    

    
}

export default new PoklanjamDataService();
