interface NameUrlStructure {
    name: string,
    url: string,
}
interface TypeObject {
    slot: number,
    type: NameUrlStructure,
}

interface StatItem {
    base_stat: number
}

// interface StatItems extends Array<StatItem>{}

export interface PokemonData {
    id: number,
    sprites: {
        other: {
            'official-artwork': {
                front_default: string
            },
            dream_world: {
                front_default: string
            }
        }
    },
    types: [TypeObject],
    name: string,
    species: NameUrlStructure,
    weight: number,
    stats: StatItem[]
}