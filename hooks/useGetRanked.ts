import { useEffect } from 'react';

// import isEqual from 'lodash/isEqual';
// import { useSelector } from 'react-redux';

import { useActions } from './useActions';
import useOriginUser from './useOriginUser';
// import useUser from './useUser';
import { fetchRanking } from '../firebase/config';
import { RankingStructureResponse } from '../interfaces/RankingStructure';
// import { RootState } from '../redux';

export const useGetRanked = (ranking: any) => {
    // const githubUser = useUser();
    const { fetchPokeRanking } = useActions();
    // const currentRanking = useSelector((state: RootState) => state.ranking.pokemonRanked)
    const originUser = useOriginUser()

    useEffect(() => {
        if(originUser && originUser.username !== 'ALLOW_NOT_ACCOUNT' && ranking.length === 0) {
            fetchRanking(originUser.username)
            .then(response => {
                if(response.length > 0 ) fetchPokeRanking(response as RankingStructureResponse[]);
            })
            .catch((error) => {
                console.log("Error getting pokemons: ", error);
            })
        }
    }, [originUser]);
}