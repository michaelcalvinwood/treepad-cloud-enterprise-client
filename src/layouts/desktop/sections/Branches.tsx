import './Branches.scss';
import React, { useContext, useState, useEffect } from "react";
import AppContext, {TreeInfo} from '../../../data/AppContext';

import settingsIcon from '../../../assets/icons/settings.svg';
import cloudIcon from '../../../assets/icons/cloud.svg';
import closeIcon from '../../../assets/icons/close.svg';
import { IonSearchbar } from '@ionic/react';

let controlToggle = false;

const Branches: React.FC = () => {
    const [tree, setTree] = useState<TreeInfo | null>(null);
    const [search, setSearch] = useState<string>('');

    const appCtx = useContext(AppContext);

    const branchesClassName = () => {
        let cname = 'branches';

        if (!appCtx.desktopSections.trees) cname += ' branches--no-trees';
        if (!appCtx.desktopSections.branches) cname += ' branches--no-branches';
        if (!appCtx.desktopSections.controls) cname += ' branches--no-controls';
        
        return cname;
    }

    const handleBranchClose = () => {
        const newVal = appCtx.desktopSections;
        newVal.branches = false;
        appCtx.setDesktopSections(prev => {
            return({...prev, branches: false})
        });
    }

    useEffect(() => {
        if (appCtx.treeInfo.length && appCtx.curTree) {
            const curTree = appCtx.treeInfo.find(tree => tree.tree_id === appCtx.curTree);
       
            if (curTree) setTree(curTree);
        } 
    })

    return (
        <div className={branchesClassName()}>
            <div className='trees__actions'>
                <img 
                    className='trees__cloud' 
                    src={cloudIcon} />
                <img
                    onClick={e => { 
                        controlToggle = !controlToggle;
                        appCtx.setDesktopSections(prev => {
                            prev.controls = controlToggle;
                            return ({...prev})
                        });
                        e.preventDefault();
                    }} 
                    className='trees__settings' 
                    src={settingsIcon} />
                <img
                    onClick={handleBranchClose} 
                    className='trees__close' 
                    src={closeIcon} />
            </div>
            <div className='branches__title-container'> 
                <p className='branches__title'>{tree && tree.tree_name}</p>
            </div>
           <IonSearchbar 
                onIonChange={e => setSearch(e.detail!.value || '')}
                className='branches__search' 
                placeholder=''/>
           
        </div>
    )
}

export default Branches;