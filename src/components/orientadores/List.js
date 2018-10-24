import React, { Component } from 'react';
import OrientadoresService from './Service'
import { Link } from 'react-router-dom'

import Table  from './../Table'
import Titulo from './../Titulo'

export default class ListOrientadores extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            orientadores : [],
            orientadorSelecionado : {},
        }

        this.setOrientadorSelecionado = this.setOrientadorSelecionado.bind(this);
        this.redirectEdit = this.redirectEdit.bind(this);
        this.removeOrientador = this.removeOrientador.bind(this);
    }

    componentDidMount(){
        OrientadoresService.listaOrientadores()
            .then(res => {
                this.setState({ orientadores : res.data });
            }).catch(erro =>{
                console.log(erro)
            })
    }

    setOrientadorSelecionado(orientador){
        this.setState({orientadorSelecionado : orientador === this.state.orientadorSelecionado ? 0 : orientador });    
    }

    redirectEdit(){
        window.location.href = `orientador/edit/${this.state.orientadorSelecionado.id}`;
    }

    removeOrientador(){
        if (window.confirm("Confirma deletar Orientador?")) {
            OrientadoresService.removeOrientador(this.state.orientadorSelecionado.id)
              .then(res => {
                const { orientadores } = this.state;
                const index = orientadores.indexOf(this.state.orientadorSelecionado);
                orientadores.splice(index, 1);
                this.setState({orientadores});
                alert("Orientador Removido com sucesso");
            }).catch(erro => {
                if(erro.response.data.status === 400)
                    alert("Orientador tem alunos ligado a Ele");
                console.log(erro)
            })
        }
    }

    render() {
        const { orientadores } = this.state;
        return (
            <div className="fadeIn">
                <Titulo texto="Orientadores"/>
                
                <Table dados={orientadores} selecionado={this.state.orientadorSelecionado} setSelecionado={this.setOrientadorSelecionado}/>             

                <div className="col-3 mt-3">        
                    <Link to="/orientador/novo"> <button type="button" className="btn btn-primary">Novo</button> </Link>
                    <button type="button" className="btn btn-info ml-1" disabled={!this.state.orientadorSelecionado} onClick={this.redirectEdit}>Alterar</button>
                    <button type="button" className="btn btn-danger ml-1" disabled={!this.state.orientadorSelecionado} onClick={this.removeOrientador}>Excluir</button>
                </div>
            </div>
        )
      }
}