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
            typeLabel: 'Challenge 1',
            key: 'normal',
        },
        {
            src: squirtleBattle,
            alt: 'squirtle',
            typeLabel: '3 vs 3',
            key: '3battle',
        },
        {
            src: charmanderBattle,
            alt: 'charmander',
            typeLabel: 'Training',
            key: 'training',
        },
        {
            src: pikachuBattle,
            alt: 'pikachu',
            typeLabel: 'Survivor',
            key: 'survivor',
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
                        className={typeFight && typeFight !== image.key ? styles['images-container-not-selected'] : ''}
                        onClick={() => changeTypeFight(image.key)}
                        priority={true}
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