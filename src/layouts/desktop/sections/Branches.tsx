import './Branches.scss';
import React, { useContext } from "react";
import AppContext from '../../../data/AppContext';

import cloudIcon from '../../../assets/icons/cloud.svg';
import closeIcon from '../../../assets/icons/close.svg';


const Branches: React.FC = () => {
    const appCtx = useContext(AppContext);

    const branchesClassName = () => {
        let cname = 'branches';

        if (!appCtx.desktopSections.trees) cname += ' branches--no-trees';
        if (!appCtx.desktopSections.branches) cname += ' branches--no-branches';
        if (!appCtx.desktopSections.controls) cname += ' branches--no-controls';
        
        return cname;
    }

    const handleBranchClose = () => {
        appCtx.setDesktopSections(prev => {
            prev.branches = false;
            return ({...prev});
        })
    }


    return (
        <div className={branchesClassName()}>
            <div className='branches__title-container'>
                <p className="branches__title">{appCtx.userName}</p>
            </div>
            <img className="branches__cloud" src={cloudIcon} />
            <img
                onClick={handleBranchClose} 
                className='branches__close'
                src={closeIcon} />
        </div>
    )
}

export default Branches;