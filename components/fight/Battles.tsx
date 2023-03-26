import { RiErrorWarningLine } from 'react-icons/ri';

import Register from './Register';
import { sections } from './sections';

const Battles = () => {
    return (
        <div>
            <div>{`You don't battle yet`} <RiErrorWarningLine color="red" /> </div>
            <div style={{display: 'flex', flexWrap: 'wrap', width: '400px', margin: 'auto'}}>
                {sections.map((section, index) => <Register key={section.key} dataNumber='1 2' section={section} />)}
            </div>
        </div>
    )
}

export default Battles;