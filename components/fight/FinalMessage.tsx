import clsx from 'clsx';
import Link from 'next/link'
import { connect } from 'react-redux';

import styles from './fight.module.css';
import { useActions } from '../../hooks/useActions';
import { musicBattlePause } from '../../redux/action-creators';
import PrimaryButton from '../buttons/PrimaryButton';

interface FinalMessageProps {
    gameOver: string,
    winnerName: string,
    xpGained: number,
}

const FinalMessage = ({ winnerName, xpGained, gameOver }: FinalMessageProps) => {

    const { musicBattlePause } = useActions();

    return (
        <div className={clsx(styles[gameOver], gameOver)}>
            <span style={{color:'#d90dde', marginLeft: '20px'}}>{`+${xpGained} XP`}</span>
            <span style={{margin: 'auto'}}>
                {winnerName.toUpperCase()} WINS
            </span>
            <div className={styles.button__playAgain}>
                <Link href='/search' style={{textDecoration: 'none'}}>
                    <PrimaryButton onClick={() => musicBattlePause()} text='PLAY AGAIN' />
                </Link>
            </div>
        </div>
    );
}

export default connect(null, { musicBattlePause })(FinalMessage);
