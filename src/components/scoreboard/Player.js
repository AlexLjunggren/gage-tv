import React from 'react';

import './Player.css';

export class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='player'>
                <div className='name'>
                    {this.props.name}
                </div>
                <div className='score'>
                    {this.props.score}
                </div>    
            </div>
        );
    }
}