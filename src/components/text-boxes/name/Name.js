import React from 'react';

import './Name.css';

export class Name extends React.Component {
    state = {}

    onChange = (event) => {
        this.props.callBackValue(event.target.value.toUpperCase());
    }

    render() {
        return (
            <div className='name'>
                <input 
                    type='text'
                    placeholder='Name'
                    onChange={event => this.onChange(event)}
                    maxLength='25'
                />
           </div>
        );
    }
}