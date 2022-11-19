interface NameUrlStructure {
    name: string,
    url: string,
}
interface TypeObject {
    slot: number,
    type: NameUrlStructure,
}

export interface PokemonData {
    id: number,
    sprites: {
        other: {
            'official-artwork': {
                front_default: string
            }
        }
    },
    types: [TypeObject],
    name: string,
    species: NameUrlStructure
}