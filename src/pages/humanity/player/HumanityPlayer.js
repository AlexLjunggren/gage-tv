import React from 'react';

import './HumanityPlayer.css';
import { PlayerSocket } from '../../../components/web-socket/PlayerSocket'
import { HumanityCard } from '../../../components/cards/humanity-card/HumanityCard'
import * as routerService from '../../../services/routerService'
import * as cardService from '../../../services/cardService'

export class HumanityPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.socket = React.createRef();
        this.state = {
            gameCode: props.location.state?.gameCode,
            playerCode: props.location.state?.playerCode,
            name: props.location.state?.name,
            type: null,
            messages: ['Waiting for Game to Start'],
            options: [],
            cards: []
        };
    }

    isRegistered = () => {
        if (this.state.gameCode === undefined || this.state.playerCode === undefined) {
            routerService.routeToRegistration(this.props.history);
            return false;
        }
        return true;
    }

    onClick = (value) => {
        this.setSelected(value);
        this.sendMessage(value);
    }

    sendMessage = (value) => {
        let message = {
            type: this.state.type,
            value: value,
        };
        this.socket.current.sendMessage(JSON.stringify(message));
    }

    receiveMessage = (message) => {
        this.setState({
            type: message.type,
            messages: message.messages,
            options: message.options,
            cards: cardService.refreshCards(message.cards, this.state.cards),
        });
    }

    setSelected = (cardId) => {
        let cards = this.state.cards;
        cards = cards.map(card => {
            card.selected = card.id === cardId;
            return card;
        })
        this.setState({
            cards: cards
        });
    }

    render() {
        if (this.isRegistered()) {
            return (
                <div className='humanity-player'>
                    <PlayerSocket
                        ref={this.socket}
                        gameCode={this.state.gameCode}
                        playerCode={this.state.playerCode}
                        receiveMessage={this.receiveMessage}
                    />
                    <div className='title'>
                        Cards Against Humanity
                    </div>
                    <div className='messages'>
                        {this.state.messages.map((text, i) => (
                            <div key={i}>{text}</div>
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
                                question={false}
                                clickable={card.clickable}
                                selected={card.selected}
                                onClick={this.onClick}
                            />
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    }
}