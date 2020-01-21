import React from 'react';
import SockJsClient from 'react-stomp';
import * as gameService from '../../services/gameService'

export class GameSocket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handShakeUrl: gameService.getSocketHandshakeUrl(),
            topics: [gameService.getListenerUrl(props.gameCode)],
            messageUrl: gameService.getMessageUrl(props.gameCode),
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