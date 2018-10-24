import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import Select from 'react-select';
import AlunosService from './Service'
import OrientadoresService from './../orientadores/Service'
import Alerta from './../Alerta'

import { Form, Field } from 'react-final-form'
import InputText from './../Input'
import Select from './../Select'

export default class FormAlunos extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            idAluno : props.match.params.id ? props.match.params.id : 0,
            name : '',
            orientador : '', 
            success : { ativo : false, mensagem : ''},
            warning : { ativo : false, mensagem : ''},
            options : []
        }

        this.salvarAluno = this.salvarAluno.bind(this);
        this.selecionaOrientador = this.selecionaOrientador.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
    }

    componentDidMount(){
        OrientadoresService.listaOrientadores()
            .then(res => {
                const advisors = res.data;
                this.setState({ advisors });
                this.transformOptions(advisors);
            }).catch(erro =>{ console.log(erro) })

        if(this.state.idAluno)
          this.getInfosAluno();
    }

    dismissAlert(alert){
        if(alert === 'warning')
            this.setState({ warning : { ativo : false } })
        else
            this.setState({ success:  { ativo : false } })
    }

    getInfosAluno(){
        AlunosService.getInfosAluno(this.state.idAluno)
            .then(res => {
                console.log(res.data);
                const aluno = res.data;
                this.setState({ name : aluno.name , orientador : { value: aluno.orientador.id, label: aluno.orientador.name } });
            }).catch(erro => { console.log(erro)})
    }

    transformOptions( advisors ) {
        const options = [];
        for (let i = 0; i < advisors.length; i++)
            options.push({ value: advisors[i].id, label: advisors[i].name })
        this.setState({options});   
    }

    selecionaOrientador(option){
        this.setState({orientador: option});
    }

    salvarAluno(dados) {
        if(!dados.name || !dados.advisor){
            this.setState({ warning : { ativo : true, mensagem : 'Preencha todos os campos' }, success : { ativo : false }})
            return false;
        }
        
        const jsonSend = { name : dados.name, advisor_id : dados.advisor }
        if(this.state.idAluno){
            jsonSend.id = this.state.idAluno;
            AlunosService.editAluno(jsonSend)
                .then(res => {
                    this.setState( {success : { ativo : true, mensagem : "Editado com Sucesso"}, warning : { ativo : false} });
                }).catch(erro => { console.log(erro); })    
        }
        else{        
            AlunosService.gravaAluno(jsonSend)
                .then(res => {
                    this.setState( {success : { ativo : true, mensagem : "Cadastrado com Sucesso"} , warning : { ativo : false} });
                }).catch(erro => { console.log(erro); })
        }
    }

    render() {
        return (
            <div className="fadeIn mt-4 p-4">
                <Form onSubmit={this.salvarAluno}
                      initialValues={{ name: this.state.name, advisor : this.state.orientador.value}}
                      render={({ handleSubmit, form, submitting, pristine}) => (
                        <form onSubmit={handleSubmit}>
                            <InputText label="Nome" name="name"/>
                            
                            <Select label="Orientador" name="advisor" options={this.state.options} />

                            <div className="mt-3">
                                <button type="submit" disabled={submitting || pristine} className="btn btn-primary">Cadastrar</button>
                                <Link to='/aluno'> <button type="submit" className="btn btn-light ml-2">Voltar</button> </Link>
                            </div>
                        </form>
                    )}
                />
                <Alerta tipo="success" clickFechar={() => this.dismissAlert('sucess')} show={this.state.success.ativo} mensagem={this.state.success.mensagem}/>
                <Alerta tipo="warning" clickFechar={() => this.dismissAlert('warning')} show={this.state.warning.ativo} mensagem={this.state.warning.mensagem} />
            </div>
        );
    }
}

