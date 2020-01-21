import React from 'react';

import './HumanityGame.css';
import * as gameService from '../../../services/gameService'
import * as cardService from '../../../services/cardService'
import { Instructions } from '../../../components/instructions/Instructions'
import { GameSocket } from '../../../components/web-socket/GameSocket'
import { Scoreboard } from '../../../components/scoreboard/Scoreboard'
import { HumanityCard } from '../../../components/cards/humanity-card/HumanityCard'
import { WinningSet } from '../../../components/cards/humanity-card/WinningSet'

export class HumanityGame extends React.Component {
    constructor(props) {
        super(props);
        this.socket = React.createRef();
        this.state = {
            gameCode: props.location.state?.gameCode,
            showInstructions: true,
            type: null,
            players: [],
            options: [],
            cards: [],
            messages: [],
            winningSets: [],
        };
    }

    register = () => {
        gameService.register('Humanity')
            .then(response => this.setState({
                gameCode: response.result.gameCode
            }));
    }

    sendMessage = (value) => {
        let message = {
            type: this.state.type,
            value: value,
        };
        if (this.state.type === 'START') {
            this.setState({
                showInstructions: false,
            });
        }
        this.socket.current.sendMessage(JSON.stringify(message));
    }

    receiveMessage = (message) => {
        console.log(JSON.stringify(message));
        if (message.type === 'PLAYERS') {
            this.setState({
                players: message.players,
            });
            return;
        }
        else if (message.type === 'HISTORY') {
            this.setState({
                winningSets: message.winningSets,
            });
            return;
        }
        this.setState({
            type: message.type,
            messages: message.messages,
            options: message.options,
            cards: cardService.refreshCards(message.cards, this.state.cards),
        });
    }

    render() {
        return (
            <div className='humanity-game'>
                <GameSocket 
                    ref={this.socket}
                    gameCode={this.state.gameCode}
                    receiveMessage={this.receiveMessage}
                />
                <div className='left-panel'>
                    <div className='title'>
                            Cards <br />
                            Against <br />
                            Humanity
                    </div>
                    <Scoreboard 
                        className='scoreboard'
                        players= {this.state.players}
                    />
                    <div className='gameCode'>
                        Game Code: {this.state.gameCode}
                    </div>
                </div>
                <div className='right-panel'>
                    {this.state.showInstructions &&
                        <Instructions 
                            gameCode={this.state.gameCode}
                        />
                    }
                    <div className='messages'>
                        {this.state.messages.map((text, i) => (
                            <div key={i}>{text}</div>
                        ))}
                    </div>
                    <div className='options'>
                        {this.state.options.map((option, i) => (
                            <div className='option' 
                                key={i}
                                onClick={() => this.sendMessage(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                    <div className='container'>
                        {this.state.cards.map((card, i) => (
                            <HumanityCard
                                className='card'
                                key={i}
                                id={card.id}
                                text={card.text}
                                showFace={card.showFace}
                                clickable={false}
                                selected={false}
                                onClick={this.onClick}
                            />
                        ))}
                    </div>
                    <div className='history'>
                        {this.state.winningSets.map((winningSet, i) => (
                            <WinningSet
                                className='set'
                                key={i}
                                questionCard={winningSet.questionCard}
                                answerCard={winningSet.answerCard}
                                player={winningSet.player}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

}