import React from 'react';

import './GameCode.css';

export class GameCode extends React.Component {
    onKeyPress = (event) => {
        if (!((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122))) {
            event.preventDefault();
        }
    }

    onChange = (event) => {
        this.props.callBackValue(event.target.value.toUpperCase());
    }

    render() {
        return (
            <div className='gameCode'>
                <input 
                    type='text'
                    placeholder='Game Code'
                    onKeyPress={event => this.onKeyPress(event)}
                    onChange={event => this.onChange(event)}
                    maxLength='4'
                />
           </div>
        );
    }
}