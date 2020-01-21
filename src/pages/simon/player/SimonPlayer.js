import React from 'react';

import './SimonPlayer.css';
import { PlayerSocket } from '../../../components/web-socket/PlayerSocket'
import * as routerService from '../../../services/routerService'

export class SimonPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.socket = React.createRef();
        this.state = {
            gameCode: props.location.state?.gameCode,
            playerCode: props.location.state?.playerCode,
            name: props.location.state?.name,
            message: {
                messages: [],
                options: []
            }
        };
    }

    isRegistered = () => {
        if (this.state.gameCode === undefined || this.state.playerCode === undefined) {
            routerService.routeToRegistration(this.props.history);
            return false;
        }
        return true;
    }

    receiveMessage = (message) => {
        this.setState({message: message});
    }

    sendMessage = (value) => {
        let message = {
            type: this.state.message.type,
            value: value,
        };
        this.socket.current.sendMessage(JSON.stringify(message));
    }

    render() {
        if (this.isRegistered()) {
            return (
                <div>
                    Simon
                    <PlayerSocket 
                        ref={this.socket}
                        gameCode={this.state.gameCode}
                        playerCode={this.state.playerCode}
                        receiveMessage={this.receiveMessage}
                    />
                    {this.state.message.messages.map((text, i) => (
                        <div key={i}>{text}</div>
                    ))}
                    {this.state.message.options.map((option, i) => (
                        <button key={i} onClick={() => this.sendMessage(option)}>
                            {option}
                        </button>
                    ))}
                </div>
            );
        }
        return null;
    }
}