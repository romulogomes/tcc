import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import OrientadoresService from './Service'
import Alerta from './../Alerta'
import { Form } from 'react-final-form'
import InputText from './../Input'

export default class FormOrientadores extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            idOrientador : props.match.params.id ? props.match.params.id : 0,
            name : '',
            area : '', 
            success : { ativo : false, mensagem : ''},
            warning : { ativo : false, mensagem : ''}
        }

        this.salvarOrientador = this.salvarOrientador.bind(this); 
        this.dismissAlert = this.dismissAlert.bind(this);       
    }

    componentDidMount(){
        if(this.state.idOrientador)
          this.getInfosOrientador();
    }

    getInfosOrientador(){
        OrientadoresService.getInfosOrientador(this.state.idOrientador)
        .then(res => {
            const orientador = res.data;
            this.setState({ name : orientador.name, area : orientador.area });
        }).catch(erro => {
            console.log(erro)
        })
    }

    transformOptions( advisors ) {
        const options = [];
        for (let i = 0; i < advisors.length; i++) {
            options.push({ value: advisors[i].id, label: advisors[i].name })
        }
        this.setState({options});   
    }

    dismissAlert(alert){
        if(alert === 'warning')
            this.setState({ warning : { ativo : false } })
        else
            this.setState({ success:  { ativo : false } })
    }

    salvarOrientador(dados){
        if(!dados.name || !dados.area){
            this.setState({ warning : { ativo : true, mensagem : 'Preencha todos os campos' }, success : { ativo : false }})
            return false;
        }
        
        if(this.state.idOrientador){
            dados.id = this.state.idOrientador;
            OrientadoresService.editaOrientador(dados)
                .then(res => {
                    this.setState( {success : { ativo : true, mensagem : "Editado com Sucesso"}, warning : { ativo : false} });
                }).catch(erro => { console.log(erro); })    
        }
        else{        
            OrientadoresService.gravaOrientador(dados)
                .then(res => {
                    this.setState( {success : { ativo : true, mensagem : "Cadastrado com Sucesso"} , warning : { ativo : false} });
                }).catch(erro => { console.log(erro); })
        }
    }

    render() {
        return (
            <div className="fadeIn mt-4 p-4">
                <Form onSubmit={this.salvarOrientador}
                      initialValues={{ name: this.state.name, area: this.state.area }}
                      render={({ handleSubmit, form, submitting, pristine}) => (
                        <form onSubmit={handleSubmit}>
                            
                            <InputText label="Nome" name="name"/>

                            <InputText label="Area" name="area"/>
                                                         
                            <div className="mt-3">
                                <button type="submit" disabled={submitting || pristine} className="btn btn-primary">Cadastrar</button>
                                <Link to='/orientador'> <button type="button" className="btn btn-light ml-2">Voltar</button> </Link>
                            </div>
                        </form>
                    )}
                />
                <Alerta tipo="success" show={this.state.success.ativo} mensagem={this.state.success.mensagem} clickFechar={() => this.dismissAlert('sucess')}/>
                <Alerta tipo="warning" show={this.state.warning.ativo} mensagem={this.state.warning.mensagem} clickFechar={() => this.dismissAlert('warning')}/>
            </div>
        );
    }
}