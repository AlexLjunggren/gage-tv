import React from 'react';

import './WinningSet.css';

import { HumanityCard } from '../humanity-card/HumanityCard'

export class WinningSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onClick = () => {
        //
    }

    render() {
        return (
            <div className='winningSet'>
                <div className='winner'>
                    Winner: {this.props.player.name}
                </div>
                <HumanityCard
                    className='questionCard'
                    id={this.props.questionCard.id}
                    text={this.props.questionCard.text}
                    showFace={true}
                    question={true}
                    clickable={false}
                    selected={false}
                    onClick={this.onClick}
                />
                <HumanityCard
                    className='answerCard'
                    id={this.props.answerCard.id}
                    text={this.props.answerCard.text}
                    showFace={true}
                    question={false}
                    clickable={false}
                    selected={false}
                    onClick={this.onClick}
                />
            </div>
        );
    }
}
