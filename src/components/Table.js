import React, { Component } from 'react';

export default class Table extends Component {
    render() {
        const { dados } = this.props;
        if(dados.length) {
            const dado = dados[0];
            return (
                <div className="col-11">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                { dado ? Object.keys(dados[0]).map(chave =>  <th className="titulo_table" key={chave}>{[chave]}</th> ) : false }
                            </tr>
                        </thead>
                        <tbody>
                            { dados.map(dado => 
                                <tr key={dado.id} className={`${dado.id === this.props.selecionado.id ? 'table-primary' : ''}`} onClick={() => this.props.setSelecionado(dado)}>
                                    { Object.keys(dado).map(chave =>
                                        <td key={chave}>{dado[chave]}</td>    
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>            
                </div>
            );
        }
        else return ( "" ) 
    }
}

  
