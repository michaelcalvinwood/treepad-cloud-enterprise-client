import React from 'react';
import Branches from './sections/Branches';
import Controls from './sections/Controls';
import Leaves from './sections/Leaves';
import Title from './sections/Title';
import Trees from './sections/Trees';
import Modals from './sections/Modals';

const Desktop: React.FC = () => {
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