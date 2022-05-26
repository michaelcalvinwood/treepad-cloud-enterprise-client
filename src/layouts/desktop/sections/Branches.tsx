import './Branches.scss';
import React, { useContext } from "react";
import AppContext from '../../../data/AppContext';

import cloudIcon from '../../../assets/icons/cloud.svg';
import closeIcon from '../../../assets/icons/close.svg';


const Branches: React.FC = () => {
    const appCtx = useContext(AppContext);

    return (
        <div className="branches">
            <div className='branches__title-container'>
                <p className="branches__title">{appCtx.userName}</p>
            </div>
            <img className="branches__cloud" src={cloudIcon} />
            <img className='branches__close' src={closeIcon} />
        </div>
    )
}

export default Branches;