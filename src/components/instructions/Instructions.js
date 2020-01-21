import React from 'react';

import './Instructions.css';

export class Instructions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='instructions'>
                Have each player navigate to 
                <span className='hyperlink'> http://localhost:3000</span> <br />
                Enter game code 
                <span className='gameCode'> {this.props.gameCode}</span> and player's name 
            </div>
        );
    }
}
