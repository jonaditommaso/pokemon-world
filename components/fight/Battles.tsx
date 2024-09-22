import { useEffect, useState } from 'react';

import get from 'lodash/get';
import Image from 'next/image';
import { RiErrorWarningLine } from 'react-icons/ri';
import { connect } from 'react-redux';

import styles from './fight.module.css'
import Register from './Register';
import { sections } from './sections';
import pikachuFight from '../../public/assets/img/pikachu-fight.png'
import { RootState } from '../../redux';

const Battles = ({ battlesData }: any) => {

    const [data, setData] = useState(undefined);

    useEffect(() => {
        if(get(battlesData, 'battles', 0) > 0) {
            let obj = {...battlesData}
            let rate = (battlesData.won / battlesData.battles) * 100
            obj.rate = `${rate}%`;
            obj.spotted = obj.spotted.length;
            setData(obj);
        }
    }, [battlesData])


    return (
        <div>
            {get(battlesData, 'battles', 0) === 0 && (
                <div
                  style={{display: 'flex', justifyContent: 'center', marginBottom: '50px', alignItems: 'center'}}>
                    {`You don't battle yet`}&nbsp;<RiErrorWarningLine color="red" />
                </div>
            )}

            <div className={styles['battles-data-container']}>
                {sections.map((section, index) => (
                    <Register key={section.key} dataNumber={get(data, `${section.key}`, '-')} section={section} />
                ))}
            </div>

            <div className={styles['pikachu-box-image-container']}>
                <Image
                    src={pikachuFight}
                    width={170}
                    alt='pikachu box'
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        battlesData: state.battlesData.battlesData,
    }
}

export default connect(mapStateToProps, null)(Battles);