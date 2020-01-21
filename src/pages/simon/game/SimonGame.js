import React from 'react';

import './SimonGame.css';

export class SimonGame extends React.Component {
    constructor(props) {
        super(props);
        this.socket = React.createRef();
        this.state = {};
    }

    render() {
        return (
            <div>Simon Game</div>
        )
    }

}