const addGameUrl = 'http://localhost:8080/api/v1/game/add/';
const findGameByCodeUrl = 'http://localhost:8080/api/v1/game/find/';
const socketHandshakeUrl = 'http://localhost:8080/handler';

export const getSocketHandshakeUrl = () => {
    return socketHandshakeUrl;
}

export const getListenerUrl = (gameCode) => {
    return '/topic/game/' + gameCode;
}

export const getMessageUrl = (gameCode) => {
    return '/app/command/game/' + gameCode;
}

export const register = async (gameName) => {
    let data = new FormData();
    data.append('gameName', gameName);
    const response = await fetch(addGameUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: data,
    });
    return await response.json();
}

export const findGameByCode = async (gameCode) => {
    const response = await fetch(findGameByCodeUrl + gameCode, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });
    return await response.json();
}
