import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class BotaoVoltar extends Component {
    render() {
        return (
            <Link to={this.props.linkVoltar}> <button type="submit" className="btn btn-light ml-2" >Voltar</button> </Link>
        );
    }
}

export default BotaoVoltar;