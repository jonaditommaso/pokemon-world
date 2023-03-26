import styles from './fight.module.css'
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

interface Section {
    label: string,
    key: string,
    color: string,
}

interface RegisterProps {
    dataNumber: string,
    section: Section
}

const Register = ({ dataNumber, section }: RegisterProps) => {
    return (
        <div className={styles['register-container']}>
            <p className={styles['register-data']} style={{ color: section.color }}>{dataNumber}</p>
            <p className={styles['register-section']}>{capitalizeFirstLetter(section.label)}</p>
        </div>
    );
}

export default Register;