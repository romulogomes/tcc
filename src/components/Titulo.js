import React, { Component } from 'react';

class Titulo extends Component {
    render() {
        return (
            <div className="col-2 mt-5">
                <h4>{this.props.texto}</h4>
              </div>
        );
    }
}

export default Titulo;