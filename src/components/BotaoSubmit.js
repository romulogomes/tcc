import React, { Component } from 'react';

class BotaoSubmit extends Component {
    render() {
        const { labelCadastrar, submitting, pristine} = this.props;
        return (
                <button type="submit" disabled={submitting || pristine} className="btn btn-primary">{labelCadastrar ? labelCadastrar : 'Cadastrar'}</button>
        );
    }
}

export default BotaoSubmit;