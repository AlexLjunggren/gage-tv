import React from 'react';

import './Game.css';
import { GameCode } from '../../components/text-boxes/gameCode/GameCode'
import * as routerService from '../../services/routerService'
import * as gameService from '../../services/gameService'

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mirrorGameCode: '',
        };
    }

    selectGame = (model) => {
        gameService.register(model.name)
            .then(response => {
                let state = {
                    mirroring: false,
                    gameCode: response.result.gameCode,
                };
                routerService.routeToPath(model.gamePath, this.props.history, state);
            });
    }

    render() {
        return (
            <div>
                <div onClick={() => this.selectGame(routerService.getSimonModel())}>Simon</div>
                <div onClick={() => this.selectGame(routerService.getHumanityModel())}>Cards Against Humanity</div>
            </div>
        );
    }
}