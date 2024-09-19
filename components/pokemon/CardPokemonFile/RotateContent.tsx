import styles from './card.module.css'

interface RotateContentProps {
    isFlipped: boolean,
    buttonType: 'weight' | 'height',
    icon: React.JSX.Element,
    value: number
}

const measurement = {
    weight: 'kg',
    height: 'mt'
}

const RotateContent = ({ isFlipped, buttonType, icon, value }: RotateContentProps) => {
    return (
        <span style={{
                display: 'flex',
                fontWeight: '600',
                fontSize: isFlipped ? '0.9rem' : '',
                transform: isFlipped
                    ? 'rotateY(180deg)'
                    : 'rotateY(0deg)',
            }}
        >
            {isFlipped
                ? (
                    <span className={styles['grow-text']} style={{ color: buttonType === 'height' ? '#212121' : '#fff' }}>
                        <span>{value / 10}</span>
                        <span>{measurement[buttonType]}</span>
                    </span>
                )
                : icon
            }
        </span>
    );
}

export default RotateContent;