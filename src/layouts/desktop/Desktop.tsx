import React, { useContext } from 'react';
import Branches from './sections/Branches';
import Controls from './sections/Controls';
import Leaves from './sections/Leaves';
import Title from './sections/Title';
import Trees from './sections/Trees';
import Modals from './sections/Modals';
import AppContext from '../../data/AppContext';

const Desktop: React.FC = () => {
    const appCtx = useContext(AppContext);
    return (
        <div className='desktop'>
            <Title />
            <Controls />
            <Trees />
            <Branches />
            <Leaves />
            <Modals />
        </div>
    )
}

export default Desktop;