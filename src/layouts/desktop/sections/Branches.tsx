import './Branches.scss';
import React, { useContext, useState, useEffect } from "react";
import AppContext from '../../../data/AppContext';

import cloudIcon from '../../../assets/icons/cloud.svg';
import closeIcon from '../../../assets/icons/close.svg';


const Branches: React.FC = () => {
    const [icon, setIcon] = useState('');
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

    useEffect(() => {
        console.log('length', appCtx.treeInfo.length);
        console.log('curTree', appCtx.curTree);
        if (appCtx.treeInfo.length && appCtx.curTree) {
            const curTree = appCtx.treeInfo.find(tree => tree.tree_id === appCtx.curTree);
            console.log('curTree', curTree);
            console.log(curTree?.icon);
            setIcon(curTree?.icon!);
        } 
    })

    return (
        <div className={branchesClassName()}>
            <div className='branches__title-container'>
                {!!icon &&
                    <img
                        className='branches__image' 
                        src={`${appCtx.server}${icon}`} 
                    />
                }
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