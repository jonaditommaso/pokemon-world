import Head from 'next/head'
import Image from 'next/image'
import { Carousel } from 'react-bootstrap';

import pikachu1 from '../public/assets/img/pikachu1.png'
import pikachu2 from '../public/assets/img/pikachu2.png'
import pikachu3 from '../public/assets/img/pikachu3.png'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
                <Carousel
                    interval={8000}
                    style={{backgroundColor: '#EB2D0C', borderRadius: '15px', opacity: '0.9'}}
                    variant="dark"
                >
                    <Carousel.Item>
                        <div className={styles.home__containerImg}>
                            <Image
                                src={pikachu1}
                                alt="pikachu"
                                style={{width: '250px', height: '250px', marginTop: '1%'}}
                            />
                        </div>
                        <div className={styles.home__text}>
                            <h3>Hi! Welcome to the Pokémon world</h3>
                            <h6>Here you will be able to see all the Pokémon, know their data, and listen to them!</h6>
                            <h6>(You can turn on and pause the music as you please).</h6>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item >
                        <div className={styles.home__containerImg}>
                            <Image
                                src={pikachu2}
                                alt="pikachu"
                                style={{width: '250px', height: '250px', marginTop: '2%'}}
                            />
                        </div>
                        <div className={styles.home__text}>
                            <h3>Login and go to the POKEDEX</h3>
                            <h6><span style={{fontStyle: 'italic'}}>See all Pokémons</span> will show you a detailed list of the Pokemons.</h6>
                            <h6><span style={{fontStyle: 'italic'}}>Search Pokemon</span> will allow you to search for a pokemon by name or number and listen to its description.</h6>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item >
                        <div className={styles.home__containerImg}>
                            <Image
                                src={pikachu3}
                                alt="pikachu"
                                style={{width: '250px', height: '250px', marginTop: '2%'}}
                            />
                        </div>
                        <div className={styles.home__text}>
                            <h3>Choose a pokemon and fight!</h3>
                            <h6>In <span style={{fontStyle: 'italic'}}>Search Pokemon</span> you can choose a Pokémon and fight with it.</h6>
                            <h6>Fight, win, and catch them now!</h6>
                        </div>
                    </Carousel.Item>
                </Carousel>
        </div>
  )
}
