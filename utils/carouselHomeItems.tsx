import React from 'react';

import pikachu1 from '../public/assets/img/pikachu1.png'
import pikachu2 from '../public/assets/img/pikachu2.png'
import pikachu3 from '../public/assets/img/pikachu3.png'

export const carouselHomeItems = [
    {
        imageSrc: pikachu1,
        alt: 'Welcome',
        content: (
            <>
                <h3>Hi! Welcome to the Pokémon world</h3>
                <h6>Here you will be able to see all the Pokémon, know their data, and listen to them!</h6>
                <h6>(You can turn on and pause the music as you please).</h6>
            </>
        ),
    },
    {
        imageSrc: pikachu2,
        alt: 'Login',
        content: (
           <>
             <h3>Login and go to the POKEDEX</h3>
             <h6><em>See all Pokémons</em> will show you a detailed list of the Pokemons.</h6>
             <h6><em>Search Pokemon</em> will allow you to search for a pokemon by name or number and listen to its description.</h6>
           </>
        ),
    },{
        imageSrc: pikachu3,
        alt: 'Fight',
        content: (
            <>
                <h3>Choose a pokemon and fight!</h3>
                <h6>In <em>Search Pokemon</em> you can choose a Pokémon and fight with it.</h6>
                <h6>Fight, win, and catch them now!</h6>
            </>
        ),
    }
]