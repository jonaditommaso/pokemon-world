// import '../../styles/sideDropdown.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Swal from 'sweetalert2';
import pokeball from '../../public/assets/img/pokeballOpen.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
// import { noBattle, musicBattlePause } from '../../redux/actions';
//{user, battle, noBattle, musicBattlePause}
const SideDropdown = ({user}: any) => {
    const router = useRouter()

    // useEffect(() => {
    // }, [battle])

    const warning = (go: string) => {
    //     if(battle.pokemon === true) {
    //         Swal.fire({
    //             icon: 'warning',
    //             text: 'Are you sure you want to abandon the battle?',
    //             showConfirmButton: true,
    //             confirmButtonText: "Ok",
    //             confirmButtonColor: '#2754d5',
    //             showCancelButton: true,
    //             cancelButtonText: 'Cancel',
    //             backdrop: true
    //         })
    //             .then((result) => {
    //                 if ((result.value) && (go === 'search')) {
    //                     noBattle();
    //                     history.push('/search');
    //                     musicBattlePause();
    //                 }
    //                 if ((result.value) && (go === 'all')) {
    //                     noBattle();
    //                     history.push('/all');
    //                     musicBattlePause();
    //                 }
    //                 if ((result.value) && (go === 'ranking')) {
    //                     noBattle();
    //                     history.push('/ranking');
    //                     musicBattlePause();
    //                 }
    //             });
    //     }
    //     else {
            if(go === 'search') {
                router.push('/search');
            }
            else if(go === 'all') {
                router.push('/pokemons');
            }
    //         else if(go === 'ranking') {
    //             history.push('/ranking');
    //         }
    //     }
    }


    return (
        <div className="sideDropdown">
            <div className="sideDropdown__userName">{`Catch them, ${user}!`}
                <Image src={pokeball} alt="pokeball" width={20}/>
            </div>
            <DropdownButton title="POKEDEX " className="sideDropdown__item">
                <Dropdown.Item onClick={() => warning('search')}>Search Pokemon</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => warning('all')}>See all Pokemons</Dropdown.Item>
                <Dropdown.Divider />
                {/* <Dropdown.Item onClick={() => warning('ranking')}>Ranking Pokemons</Dropdown.Item> */}
            </DropdownButton>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.login.user,
        // battle: state.battle
    }
}

export default connect(mapStateToProps, null)(SideDropdown);