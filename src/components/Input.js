import React, { Component } from 'react';
import { Field } from 'react-final-form'


export default class InputText extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
                <div className="form-group">
                    <label htmlFor="name">{this.props.label}</label>
                    <Field name={this.props.name} component="input" type="text" className="form-control" />
                </div>
        );
    }
}
