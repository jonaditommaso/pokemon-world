import PokemonService from "./PokemonHelper";

const pokemonService = new PokemonService();

const getPokemon = async (url: string) => {
    const { data } = await pokemonService.getUrlForEachPokemon(url);
    return data;
}

export const loadPokemons = async (pokemonList: any) => {
    let _pokemonData = await Promise.all(pokemonList.map(async (pokemon: any) => {
        const url = pokemon.url || pokemon.pokemon.url;
        let pokemonRecord = await getPokemon(url);
        return pokemonRecord;
    }));
    return _pokemonData;
}