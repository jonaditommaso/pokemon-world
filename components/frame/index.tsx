import clsx from "clsx";
import Image from "next/image";

import styles from './frame.module.css';
import pokeball from '../../public/assets/img/pokeball.png'

interface FrameProps {
    condition?: boolean
}

const Frame = ({ condition }: FrameProps) => {
    return (
        <div  style={{ marginRight: '10%', marginLeft: '10%' }}>
            {[...Array(4)].map((_, index) => (
                <span key={index} className={clsx(condition && 'd-none', styles[`corner-pokeball-${index}`],styles['corner-pokeball'])}>
                    <Image src={pokeball} alt='pokeball' width={50}  />
                </span>
                ))
            }
        </div>
    );
}

export default Frame;