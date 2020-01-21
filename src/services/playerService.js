const addPlayerUrl = 'http://localhost:8080/api/v1/player/add/';
const socketHandshakeUrl = 'http://localhost:8080/handler';

export const getSocketHandshakeUrl = () => {
    return socketHandshakeUrl;
}

export const getListenerUrl = (gameCode, playerCode) => {
    return '/topic/game/' + gameCode + '/player/' + playerCode;
}

export const getMessageUrl = (gameCode, playerCode) => {
    return '/app/command/game/' + gameCode + '/player/' + playerCode;
}

export const register = async (gameCode, name) => {
    let data = new FormData();
    data.append('gameCode', gameCode);
    data.append('name', name);
    const response = await fetch(addPlayerUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: data
    });
    return await response.json();
}

