import React from 'react';

import { Switch, Route } from 'react-router-dom'
import { Registration } from '../../pages/registration/Registration'
import { Game } from '../../pages/game/Game'
import { SimonGame } from '../../pages/simon/game/SimonGame'
import { SimonPlayer } from '../../pages/simon/player/SimonPlayer'
import { HumanityGame } from '../../pages/humanity/game/HumanityGame'
import { HumanityPlayer } from '../../pages/humanity/player/HumanityPlayer'
import * as routerService from '../../services/routerService'

export class Router extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<main>
				<Switch>
					<Route exact path='/' component={Registration} />
					<Route path={'/game'} component={Game} />
					<Route path={routerService.getSimonModel().gamePath} component={SimonGame} />
					<Route path={routerService.getSimonModel().playerPath} component={SimonPlayer} />
					<Route path={routerService.getHumanityModel().gamePath} component={HumanityGame} />
					<Route path={routerService.getHumanityModel().playerPath} component={HumanityPlayer} />
				</Switch>
			</main>
		);
	}

}
