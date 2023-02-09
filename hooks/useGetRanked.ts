import { useEffect } from 'react';
import { fetchRanking } from '../firebase/config';
import { useActions } from './useActions';
import useUser from './useUser';

export const useGetRanked = (ranking) => {
    const githubUser = useUser();
    const { fetchPokeRanking } = useActions();

    useEffect(() => {
        if(githubUser && ranking.length === 0) fetchRanking(githubUser.userId)
        .then(response => {
            if(response.length > 0) fetchPokeRanking(response)
        })
        .catch((error) => {
            console.log("Error getting pokemons: ", error);
        })
    }, [githubUser]);
}