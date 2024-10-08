import React, { useState, useEffect } from 'react';

import { Divider, FormControl, Select } from '@mui/material';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import MenuPokeItem from './MenuPokeItem';
import styles from './sideDropdown.module.css'
import { useActions } from '../../hooks/useActions';
import pokeball from '../../public/assets/img/pokeballOpen.png'
import { noBattle, musicBattlePause } from '../../redux/action-creators'

interface SideDropdownProps {
    user: string,
    battle: {
        pokemon: null | boolean
    }
}

const SideDropdown = ({user, battle}: SideDropdownProps) => {

    const router = useRouter();
    const { noBattle, musicBattlePause } = useActions();
    const [open, setOpen] = useState(false);

    useEffect(() => {
    }, [battle])

    const warning = (go: string) => {
        setOpen(false);
        if(battle.pokemon === true) {
            Swal.fire({
                icon: 'warning',
                text: 'Are you sure you want to abandon the battle?',
                showConfirmButton: true,
                confirmButtonText: "Ok",
                confirmButtonColor: '#2754d5',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                backdrop: true
            })
                .then((result: any) => {
                    if (result.value) {
                        noBattle(false);
                        router.push(go);
                        musicBattlePause();
                    }
                });
        }
        else {
            router.push(go);
        }
    }


    return (
        <div className={styles.sideDropdown}>
            <div className={styles.sideDropdown__userName}>
                {`Catch them ${user === 'ALLOW_NOT_ACCOUNT' ? '' : user}!`}
                <Image src={pokeball} alt="pokeball" width={20}/>
            </div>
            <FormControl sx={{ minWidth: 120, background: '#22577a', borderRadius: '5px', height: 'fit-content' }}>
                <Select
                    size='small'
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    displayEmpty
                    renderValue={() => <em>POKEDEX</em>}
                    sx={{
                        color: 'white',
                        '.MuiSvgIcon-root ': {
                            fill: "white !important",
                        }
                    }}
                >
                    <MenuPokeItem onClick={() => warning('/search')} text='Search Pokemon' />
                    <Divider  />
                    <MenuPokeItem onClick={() => warning('/pokemons')} text='See all Pokemons' />
                    <Divider  />
                    <MenuPokeItem onClick={() => warning('/ranking')} text='Statistics Pokemons' />
                </Select>
            </FormControl>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.login.user,
        battle: state.battle
    }
}

export default connect(mapStateToProps, { noBattle, musicBattlePause })(SideDropdown);