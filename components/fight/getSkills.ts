import { Moves, PokemonFighter } from "../../interfaces/Fighter";

export const getSkills = (character: PokemonFighter, player: 'opponent' | 'me') => {
    let moves: Moves = {
        opponent: [],
        me: [],
    }

    const numberOfMoves = character.moves.length;
    const movesRange = numberOfMoves >= 20 ? character.moves.slice(16, 20) : character.moves.slice(0, 4);

    movesRange.forEach((move) => {
        moves[player].push(move.move.name);
    });

    return moves[player];
}