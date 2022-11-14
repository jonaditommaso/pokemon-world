import axios from 'axios';

export default class PokemonService {

    // async getNextPokemons(nextUrl) {
    //     return await axios.get(nextUrl);
    // }

    // async getPrevPokemons(prevUrl) {
    //     return await axios.get(prevUrl);
    // }

    async getUrlForEachPokemon(url: string) {
        return await axios.get(url);
    }

    // async getNextCardPokemon(nextPoke) {
    //     return await axios.get(nextPoke);
    // }

    // async getPrevCardPokemon(prevPoke) {
    //     return await axios.get(prevPoke);
    // }
};