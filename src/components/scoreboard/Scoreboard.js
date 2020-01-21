import React from 'react';

import './Scoreboard.css';
import { Player } from './Player'

export class Scoreboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='scoreboard'>
                {this.props.players.map((player, i) => (
                    <Player 
                        key={i}
                        name={player.name}
                        score={player.score}
                    />
                ))}
            </div>
        );
    }
}