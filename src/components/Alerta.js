import React, { Component } from 'react';

class Alerta extends Component {
    render() {
        return (
            <div>
                { this.props.show  && this.props.tipo === "success" &&
                    <div className="alert alert-success mt-4 fadeIn" role="alert">
                         { this.props.mensagem ? this.props.mensagem : "Salvo com Sucesso"}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.clickFechar}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> }

                { this.props.show  && this.props.tipo === "warning" && 
                    <div className="alert alert-warning alert-dismissible fade show mt-4 fadeIn" role="alert">
                        <strong>Atenção!</strong> { this.props.mensagem ? this.props.mensagem : ""}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.clickFechar} >
                            <span aria-hidden="true">&times;</span>
                        </button>
                  </div> }
            </div>
        );
    }
}

export default Alerta;