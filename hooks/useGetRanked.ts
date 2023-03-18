import { useEffect } from 'react';

import isEqual from 'lodash/isEqual';
import { useSelector } from 'react-redux';

import { useActions } from './useActions';
import useUser from './useUser';
import { fetchRanking } from '../firebase/config';
import { RootState } from '../redux';

export const useGetRanked = (ranking) => {
    const githubUser = useUser();
    const { fetchPokeRanking } = useActions();
    const currentRanking = useSelector((state: RootState) => state.ranking.pokemonRanked)

    useEffect(() => {
        if(githubUser && ranking.length === 0) fetchRanking(githubUser.userId)
        .then(response => {
            if(response.length > 0 ) fetchPokeRanking(response);
        })
        .catch((error) => {
            console.log("Error getting pokemons: ", error);
        })
    }, [githubUser]);
}