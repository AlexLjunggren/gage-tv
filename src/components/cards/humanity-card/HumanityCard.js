import React from 'react';

import './HumanityCard.css'
import classnames from 'classnames';

export class HumanityCard extends React.Component {
    constructor(props) {
        super(props);
        this.socket = React.createRef();
        this.state = {}
    }

    onClick = () => {
        if (this.props.clickable) {
            this.props.onClick(this.props.id);
        }
    }

    sideOfCard = () => {
        return !this.props.showFace ? 'back' :
            this.props.question ? 'question' : 
                'answer'
    }

    selected = () => {
        return this.props.selected ? 'selected' : ''
    }

    render() {
        let sideOfCard = this.sideOfCard();
        let selected = this.selected();
        return (
            <div className={classnames('humanity-card', sideOfCard, selected)} 
                onClick={() => this.onClick()}
            >
                {sideOfCard === 'back' ? '' : this.props.text}
            </div>
        );
    }

}
