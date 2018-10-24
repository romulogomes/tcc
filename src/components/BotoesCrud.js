import React, { Component } from 'react';

import BotaoSubmit from './BotaoSubmit'
import BotaoVoltar from './BotaoVoltar'

class BotoesCrud extends Component {
    render() {
        const { labelCadastrar, linkVoltar, submitting, pristine} = this.props;
        return (
            <div className="mt-3">
                <BotaoSubmit labelCadastrar={labelCadastrar} submitting={submitting} pristine={pristine} />
                <BotaoVoltar linkVoltar={linkVoltar}/>
                
            </div>
        );
    }
}

export default BotoesCrud;