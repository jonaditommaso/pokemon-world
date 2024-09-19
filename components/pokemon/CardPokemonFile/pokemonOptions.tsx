import ChevronUp from '../../../utils/svg/ChevronUp';
import Height from '../../../utils/svg/Height';
import ListenDescriptionIcon from '../../../utils/svg/ListenDescriptionIcon';
import ListenPokemonIcon from '../../../utils/svg/ListenPokemonIcon';
import Weight from '../../../utils/svg/Weight';

export const pokemonOptions = [
    { button: 'weight', icon: <Weight fill='white' />, backgroundColor: '#d98218', title: 'Check weight' },
    { button: 'height', icon: <Height fill='#212121' />, backgroundColor: '#D7D4D4', title: 'Check height' },
    { button: 'listen-pokemon', icon: <ListenPokemonIcon />, backgroundColor: '#F6FB2A', title: 'Listen Pokémon' },
    { button: 'listen-description', icon: <ListenDescriptionIcon />, backgroundColor: '#D32F2F', title: 'Listen description' },
    { button: 'see-evolution', icon: <ChevronUp fill='white' />, backgroundColor: '#22577A', title: null },
]