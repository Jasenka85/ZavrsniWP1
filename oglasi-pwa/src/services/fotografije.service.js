import http from "../http-common";

class FotografijaDataService{

    async get(){
        return await http.get('/Fotografije');
    }


    async delete(sifra){
        const odgovor = await http.delete('/Fotografije/' + sifra)
        .then(response => {
            return {ok: true, poruka: 'Fotografija uspješno obrisana.'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });
        return odgovor;
    }

 
    
}

export default new FotografijaDataService();
