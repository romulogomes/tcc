import React, { Component } from 'react';
import OrientadoresService from './Service'
import { Link } from 'react-router-dom'


class ListOrientadores extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            orientadores : [],
            orientadorSelecionado : 0,
        }

        this.setOrientadorSelecionado = this.setOrientadorSelecionado.bind(this);
        this.redirectEdit = this.redirectEdit.bind(this);
        this.removeOrientador = this.removeOrientador.bind(this);
    }


    componentDidMount(){
        OrientadoresService.listaOrientadores()
            .then(res => {
                const orientadores = res.data;
                this.setState({ orientadores });
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
                const orientadores = this.state.orientadores;
                const index = orientadores.indexOf(this.state.orientadorSelecionado);
                orientadores.splice(index, 1);
                this.setState({orientadores});
                alert("Orientador Removido com sucesso");
            }).catch(erro => {
                if(erro.response.data.status === 400)
                    alert("Orientador tem alunos ligado a Ele");
                else
                    console.log(erro)
                
            })
        }
    }

    render() {
        const { orientadores } = this.state;
        
        return (
          <div className="fadeIn">
              <div className="col-2 mt-5">
                <h4>Orientadores</h4>
              </div>
              
              <div className="col-11">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Area</th>
                        </tr>
                    </thead>
                    <tbody>
                        { orientadores.map(orientador => 
                            <tr key={orientador.id} className={`${orientador === this.state.orientadorSelecionado? 'table-primary' : ''}`} onClick={() => this.setOrientadorSelecionado(orientador)}>
                                <th>{orientador.id}</th>
                                <td>{orientador.name}</td>
                                <td>{orientador.area}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
              </div>
         
                <div className="col-3 mt-3">
                    <Link to="/orientador/novo"> <button type="button" className="btn btn-primary">Novo</button> </Link>
                    <button type="button" className="btn btn-info ml-1" disabled={!this.state.orientadorSelecionado} onClick={this.redirectEdit}>Alterar</button>
                    <button type="button" className="btn btn-danger ml-1" disabled={!this.state.orientadorSelecionado} onClick={this.removeOrientador}>Excluir</button>
                </div>
          </div>
        )
      }
}

export default ListOrientadores;