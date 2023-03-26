import clsx from 'clsx';
import Image from "next/image";

import styles from './fight.module.css';
import bulbasaurBattle from '../../assets/img/battle/bulbasaur-battle.png'
import charmanderBattle from '../../assets/img/battle/charmander-battle.png'
import pikachuBattle from '../../assets/img/battle/pikachu-battle.png'
import squirtleBattle from '../../assets/img/battle/squirtle-battle.png'

const TypeFight = ({ typeFight, changeTypeFight }: any) => {

    const images = [
        {
            src: bulbasaurBattle,
            alt: 'bulbasaur',
            typeLabel: 'Challenge 1'
        },
        {
            src: squirtleBattle,
            alt: 'squirtle',
            typeLabel: '3 vs 3'
        },
        {
            src: charmanderBattle,
            alt: 'charmander',
            typeLabel: 'Training'
        },
        {
            src: pikachuBattle,
            alt: 'pikachu',
            typeLabel: 'Survivor'
        },
    ];

    return (
        <div className={styles['images-container']}>
            {images.map((image, index) => (
                <div key={index} style={{position: 'relative'}}>
                    <Image
                    key={image.alt}
                    src={image.src}
                    alt={image.alt}
                    height={200}
                    width={400}
                    className={typeFight && typeFight !== image.alt ? styles['images-container-not-selected'] : ''}
                    onClick={() => changeTypeFight(image.alt)}
                    />
                    <p className={clsx(styles['type-fight-text'], styles[`type-fight-text-${index === 0 || index === 2 ? 'left': 'right'}`])}>
                        {image.typeLabel}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default TypeFight;