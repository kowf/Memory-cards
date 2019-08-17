const initalState = {
    cardsColor: Array(16).fill(null),
    revealed: Array(16).fill(false),
    visible: Array(16).fill(true),
    flipCount: 1,
    lastCard: { id: 20, color: 20 },
    score: 0,
    pairCount: 8,
}

export {initalState};