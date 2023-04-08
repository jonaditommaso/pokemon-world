import { useEffect, useState } from 'react';

import get from 'lodash/get';
import { RiErrorWarningLine } from 'react-icons/ri';
import { connect } from 'react-redux';

import Register from './Register';
import { sections } from './sections';
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
                  style={{display: 'flex', justifyContent: 'center', marginBottom: '15px', alignItems: 'center'}}>
                    {`You don't battle yet`}&nbsp;<RiErrorWarningLine color="red" />
                </div>
                )}
            <div style={{display: 'flex', flexWrap: 'wrap', width: '400px', margin: 'auto'}}>
                {sections.map((section, index) => (
                    <Register key={section.key} dataNumber={get(data, `${section.key}`, '-')} section={section} />
                ))}
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