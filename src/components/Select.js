import React, { Component } from 'react';
import { Form, Field } from 'react-final-form'

class Select extends Component {
    render() {
        const { name, label, options } = this.props;
        return (
            <div className="form-group">
                <label htmlFor="advisor">{label}</label>
                <Field name={name} className="form-control" component="select">
                    <option />
                    { options.map(opcao => <option key={opcao.value} value={opcao.value}>{opcao.label}</option>)}
                </Field>
            </div>
        );
    }
}

export default Select;