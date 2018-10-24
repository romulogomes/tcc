import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import AlunosService from './Service'
import Table  from './../Table'
import Titulo from './../Titulo'

export default class ListAlunos extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            alunos: [],
            alunoSelecionado : {},
            dadosTabela : []
        }

        this.setAlunoSelecionado = this.setAlunoSelecionado.bind(this);
        this.redirectEditAluno = this.redirectEditAluno.bind(this);
        this.removeAluno = this.removeAluno.bind(this);
        this.transformDataToTable = this.transformDataToTable.bind(this);
    }

    componentDidMount(){
        AlunosService.listaAlunos()
            .then(res => {
                const alunos = res.data;
                this.setState({ alunos });
                this.transformDataToTable(alunos);
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

    transformDataToTable( dados ) {
        const json = [];
        if(dados){ 
            for (let i = 0; i < dados.length; i++) {
                json.push({
                    "id" : dados[i].id,
                    "name" : dados[i].name,
                    "orientador" : dados[i].orientador.name,
                    "area" : dados[i].orientador.area
                })
            }
        }
        this.setState({ dadosTabela : json })
    }

    render() {
        return (
          <div className="fadeIn">

                <Titulo texto="Alunos"/>

                <Table dados={this.state.dadosTabela} selecionado={this.state.alunoSelecionado} setSelecionado={this.setAlunoSelecionado}/>
                
                <div className="col-3 mt-3">
                    <Link to="/aluno/novo"> <button type="button" className="btn btn-primary">Novo</button> </Link>
                    <button type="button" className="btn btn-info ml-1" disabled={!this.state.alunoSelecionado} onClick={this.redirectEditAluno}>Alterar</button>
                    <button type="button" className="btn btn-danger ml-1" disabled={!this.state.alunoSelecionado} onClick={this.removeAluno}>Excluir</button>
                </div>
          </div>
        )
      }
}