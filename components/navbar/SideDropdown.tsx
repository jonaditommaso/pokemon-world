import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import pokeball from '../../public/assets/img/pokeballOpen.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './sideDropdown.module.css'
import { useActions } from '../../hooks/useActions';
import { noBattle, musicBattlePause } from '../../redux/action-creators'
import { Divider, FormControl, MenuItem, Select } from '@mui/material';

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
                .then((result) => {
                    if ((result.value) && (go === 'search')) {
                        noBattle(false);
                        router.push('/search');
                        musicBattlePause();
                    }
                    if ((result.value) && (go === 'all')) {
                        noBattle(false);
                        router.push('/pokemons');
                        musicBattlePause();
                    }
                    if ((result.value) && (go === 'ranking')) {
                        noBattle(false);
                        router.push('/ranking');
                        musicBattlePause();
                    }
                });
        }
        else {
            if(go === 'search') {
                router.push('/search');
            }
            else if(go === 'all') {
                router.push('/pokemons');
            }
            else if(go === 'ranking') {
                router.push('/ranking');
            }
        }
    }


    return (
        <div className={styles.sideDropdown}>
            <div className={styles.sideDropdown__userName}>{`Catch them, ${user}!`}
                <Image src={pokeball} alt="pokeball" width={20}/>
            </div>
            <FormControl sx={{ minWidth: 120, background: '#22577a', borderRadius: '5px' }}>
                <Select
                    size='small'
                    open={open}
                    onOpen={() => setOpen(true)}
                    displayEmpty
                    renderValue={() => <em>POKEDEX</em>}
                    sx={{
                        color: 'white',
                        '.MuiSvgIcon-root ': {
                            fill: "white !important",
                        }
                    }}
                >
                    <MenuItem onClick={() => warning('search')}>Search Pokemon</MenuItem>
                    <Divider  />
                    <MenuItem onClick={() => warning('all')}>See all Pokemons</MenuItem>
                    <Divider  />
                    <MenuItem onClick={() => warning('ranking')}>Ranking Pokemons</MenuItem>
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