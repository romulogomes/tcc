import axios from 'axios';
import { API_URL } from '../../ApiUrl'


class OrientadoresService {
    constructor(){
       this.url_orientadores = API_URL+'orientadores/';
    }

    listaOrientadores(){
        return axios.get(this.url_orientadores);
    }

    getInfosOrientador(idOrientador){
        return axios.get(this.url_orientadores+idOrientador);
    }

    gravaOrientador(data){
        return axios.post(this.url_orientadores, data);
    }

    editaOrientador(data){
        return axios.put(this.url_orientadores, data);
    }

    removeOrientador(idOrientador){
        return axios.delete(this.url_orientadores+idOrientador);
    }
}

export default new OrientadoresService()