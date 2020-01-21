export const routePlayerPathByGameName = (gameName, history, state) => {
    let gameModel = findModelByGameName(gameName);
    routeToPath(gameModel.playerPath, history, state);
}

export const findModelByGameName = (gameName) => {
    let simon = getSimonModel();
    let humanity = getHumanityModel();
    switch(gameName) {
        case simon.name:
            return simon;
        case humanity.name:
            return humanity;
        default:
            return {
                gamePath: '/game',
            }
    }
}

export const routeToPath = (path, history, state) => {
    history.push({
        pathname: path,
        state: state,
    });
}

export const routeToRegistration = (history) => {
    history.push({
        pathname: '/',
    });
}

export const routeToGameSelection = (history) => {
    history.push({
        pathname: '/game',
    });
}

export const getSimonModel = () => {
    return {
        name: 'Simon',
        gamePath: '/simon/game',
        playerPath: '/simon/player',
    };
}

export const getHumanityModel = () => {
    return {
        name: 'Humanity',
        gamePath: '/humanity/game',
        playerPath: '/humanity/player',
    }
}

