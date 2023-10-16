import http from "../http-common";

class TrazimDataService{

    async get(){
        return await http.get('/Oglasi/Trazim');
    }

    

    
}

export default new TrazimDataService();