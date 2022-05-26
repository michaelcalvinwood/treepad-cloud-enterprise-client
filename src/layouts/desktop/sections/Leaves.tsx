import './Leaves.scss';
import React, { useContext } from "react";
import AppContext from '../../../data/AppContext';

import fullScreenIcon from '../../../assets/icons/full-screen.svg';
import normalScreenIcon from '../../../assets/icons/normal-screen.svg';


const Leaves: React.FC = () => {
    const appCtx = useContext(AppContext);

    const branchesClassName = () => {
        let cname = 'leaves';

        let ammend = ' leaves';

        if (!appCtx.desktopSections.trees) ammend += '--no-trees';
        if (!appCtx.desktopSections.branches) ammend += '--no-branches';
        if (!appCtx.desktopSections.controls) ammend += '--no-controls';
        
        if (ammend !== ' leaves') cname += ammend;
        return cname;
    }

    return (
        <div className={branchesClassName()}>
            

            <img className='leaves__full-screen' src={fullScreenIcon} />
        </div>
        
    )
}

export default Leaves;
