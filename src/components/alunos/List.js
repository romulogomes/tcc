import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import AlunosService from './Service'



class ListAlunos extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            alunos: [],
            alunoSelecionado : 0
        }

        this.setAlunoSelecionado = this.setAlunoSelecionado.bind(this);
        this.removeAluno = this.removeAluno.bind(this);
        this.redirectEditAluno = this.redirectEditAluno.bind(this);
    }
    

    componentDidMount(){
        AlunosService.listaAlunos()
            .then(res => {
                const alunos = res.data;
                this.setState({ alunos });
            }).catch(erro =>{
                console.log(erro)
            })
    }

    setAlunoSelecionado(aluno){
        this.setState({alunoSelecionado : aluno === this.state.alunoSelecionado ? 0 : aluno });    
    }

    redirectEditAluno(){
        window.location.href = `aluno/edit/${this.state.alunoSelecionado.id}`;
    }

    removeAluno(){
        if (window.confirm("Confirma deletar Aluno?")) {
            AlunosService.removeAluno(this.state.alunoSelecionado.id) 
              .then(res => {
                alert("Aluno Removido com sucesso");
                const alunos = this.state.alunos;
                const index = alunos.indexOf(this.state.alunoSelecionado);
                alunos.splice(index, 1);
                this.setState({alunos});
            }).catch(erro =>{
                console.log(erro)
            })
        }
    }

    render() {
        const {alunos} = this.state;
        return (
          <div className="fadeIn">
              <div className="col-2 mt-5">
                <h4>Alunos</h4>
              </div>
              
              <div className="col-11">
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Orientador</th>
                        <th scope="col">Area</th>
                        </tr>
                    </thead>
                    <tbody>
                        { alunos.map(aluno => 
                            <tr key={aluno.id} className={`${aluno === this.state.alunoSelecionado? 'table-primary' : ''}`} onClick={() => this.setAlunoSelecionado(aluno)}>
                                <th>{aluno.id}</th>
                                <td>{aluno.name}</td>
                                <td>{aluno.orientador.name}</td>
                                <td>{aluno.orientador.area}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
              </div>
         
                <div className="col-3 mt-3">
                    <Link to="/aluno/novo">
                        <button type="button" className="btn btn-primary">Novo</button>
                    </Link>
                    <button type="button" className="btn btn-info ml-1" disabled={!this.state.alunoSelecionado} onClick={this.redirectEditAluno}>Alterar</button>
                    <button type="button" className="btn btn-danger ml-1" disabled={!this.state.alunoSelecionado} onClick={this.removeAluno}>Excluir</button>
                </div>
          </div>
        )
      }
}

export default ListAlunos;