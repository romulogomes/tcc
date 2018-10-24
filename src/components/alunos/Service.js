import axios from 'axios';
import { API_URL } from '../../ApiUrl'


class AlunosService {
    constructor(){
       this.url_alunos = API_URL+'students/';
    }

  listaAlunos(){
      return axios.post(this.url_alunos+'dados_completos', {});
  }

  getInfosAluno(idAluno){
      return axios.get(this.url_alunos + idAluno);
  }

  gravaAluno(data){
      return axios.post( this.url_alunos, data);
  }

  editAluno(data){
      return axios.put(this.url_alunos, data);
  }

  removeAluno(idAluno){
      return axios.delete(this.url_alunos+idAluno);
  }
  

}

export default new AlunosService();