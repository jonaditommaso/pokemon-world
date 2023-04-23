export interface RankingStructure {
    pokemon: string,
    ranking: number,
    type: string[],
    user: string
}

export interface RankingStructureResponse extends Record<string, any> {
    pokemon: string;
    ranking: number;
    type: string[];
    user: string;
  }