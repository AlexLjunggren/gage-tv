import React from 'react';

import './Registration.css';
import { GameCode } from '../../components/text-boxes/gameCode/GameCode'
import { Name } from '../../components/text-boxes/name/Name'
import * as playerService from '../../services/playerService'
import * as routerService from '../../services/routerService'

export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameCode: '',
            name: '',
            error: null,
        };
    }

    setGameCode = (gameCode) => {
        this.setState({gameCode: gameCode});
    }
    
    setName = (name) => {
        this.setState({name: name});
    }

    isButtonDisabled = () => {
        return this.state.gameCode.length !== 4 || this.state.name === "";
    }

    submit = () => {
        playerService.register(this.state.gameCode, this.state.name)
            .then(response => this.processResponse(response));
    }

    processResponse = (response) => {
        if (response.error !== null) {
            return this.setState({error: response.error});
        }
        let gameName = response.result.gameName;
        let state = {
            gameCode: this.state.gameCode,
            playerCode: response.result.playerCode,
            name: this.state.name
        };
        routerService.routePlayerPathByGameName(gameName, this.props.history, state);
    }

    render() {
        return (
            <div className='registration'>
                <GameCode callBackValue={this.setGameCode}/>
                <Name callBackValue={this.setName}/>
                <button 
                    onClick={() => this.submit()}
                    disabled={this.isButtonDisabled()}
                >
                    Play
                </button>
                <div className='error'>{this.state.error}</div>
            </div>
        );
    }
}