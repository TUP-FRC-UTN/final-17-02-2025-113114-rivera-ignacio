export interface User{
    id: number,
    username: string,
    password: string,
    role: string
}

export interface Word{
    id: string,
    word: string,
    category: string
}

export interface Score{
    playerName: string,
    word: string,
    attemptsLeft: number,
    score: number,
    date: string,
    idGame: string,
    id: string
}

export interface PostScore{
    playerName: string,
    word: string,
    attemptsLeft: number,
    score: number,
    date: string,
    idGame: string
}