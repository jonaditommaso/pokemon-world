import axios from 'axios';

const getEvolutionChain = async (pokemonChain: string) => {
    const { data } =  await axios.get(pokemonChain);
    return data?.evolution_chain.url;
}

export const getEvolutions = async (pokemonChain: string) => {
    const evolutionChain = await getEvolutionChain(pokemonChain);
    const { data } = await axios.get(evolutionChain);

    const evolutions = {
        first: data?.chain.species.name,
        second: data?.chain.evolves_to[0]?.species?.name,
        third: data?.chain.evolves_to[0]?.evolves_to[0]?.species?.name
    };

    return evolutions;
}