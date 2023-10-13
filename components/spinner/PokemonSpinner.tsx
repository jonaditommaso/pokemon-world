import Image from 'next/image';

import pokeball from '/public/assets/img/pokeball.png'

import styles from './index.module.css';

const PokemonSpinner = () => {
    return (
        <div className={styles.loading}>
            <Image src={pokeball} width={70} alt="loading" />
        </div>
    );
}

export default PokemonSpinner;