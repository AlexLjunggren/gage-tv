export const refreshCards = (newCards, existingCards) => {
    let cardsToRemove = existingCards.filter(card => findCard(card, newCards) === undefined);
    let cardsToAdd = newCards.filter(card => findCard(card, existingCards) === undefined);
    let cardsToUpdate = newCards.filter(card => findCard(card, existingCards) !== undefined);
    cardsToRemove.forEach(card => existingCards = removeCard(card, existingCards));
    cardsToAdd.forEach(card => existingCards = addCard(card, existingCards));
    cardsToUpdate.forEach(card => existingCards = updateCard(card, existingCards));
    return existingCards;
}

export const findCard = (cardToFind, setOfCards) => {
    return setOfCards.find(card => card.id === cardToFind.id);
}

export const addCard = (cardToAdd, setOfCards) => {
    return setOfCards.concat(cardToAdd);
}

export const removeCard = (cardToRemove, setOfCards) => {
    return setOfCards.filter(card => card.id !== cardToRemove.id);
}

export const updateCard = (cardToUpdate, setOfCards) => {
    return setOfCards.map(card => {
        return card.id === cardToUpdate.id ? cardToUpdate : card;
    });
}

