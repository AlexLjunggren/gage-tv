import React from 'react';
import SockJsClient from 'react-stomp';
import * as playerService from '../../services/playerService'

export class PlayerSocket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handShakeUrl: playerService.getSocketHandshakeUrl(),
            topics: [playerService.getListenerUrl(props.gameCode, props.playerCode)],
            messageUrl: playerService.getMessageUrl(props.gameCode, props.playerCode),
        };
    }

    receiveMessage = (message) => {
        this.props.receiveMessage(message);
    }

    sendMessage = (message) => {
        this.clientRef.sendMessage(this.state.messageUrl, message);
    }

    render() {
        return (
            <div>
                <SockJsClient
                    url={this.state.handShakeUrl}
                    topics={this.state.topics}
                    onMessage={(message) => this.receiveMessage(message)}
                    ref={(client) => { this.clientRef = client }}
                />
            </div>
        );
    }
}