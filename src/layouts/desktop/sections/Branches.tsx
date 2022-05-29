import './Branches.scss';
import React, { useContext, useState, useEffect } from "react";
import AppContext, {TreeInfo} from '../../../data/AppContext';

import cloudIcon from '../../../assets/icons/cloud.svg';
import closeIcon from '../../../assets/icons/close.svg';
import { IonSearchbar } from '@ionic/react';


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
            if (curTree) setTree(curTree);
        } 
    })

    return (
        <div className={branchesClassName()}>
            {/* <div className='trees__actions'>
                <img 
                    className='trees__cloud' 
                    src={cloudIcon} />
                <img
                    onClick={() => setSettings(prev => !prev)} 
                    className='trees__settings' 
                    src={settingsIcon} />
                <img
                    onClick={handleTreeClose} 
                    className='trees__close' 
                    src={closeIcon} />
            </div> */}
            <div className='branches__title-container'> 
                <p className='branches__title'>{tree && tree.tree_name}</p>
            </div>
           <IonSearchbar 
                onIonChange={e => setSearch(e.detail!.value || '')}
                className='branches__search' 
                placeholder=''/>
            <img className="branches__cloud" src={cloudIcon} />
            <img
                onClick={handleBranchClose} 
                className='branches__close'
                src={closeIcon} />
        </div>
    )
}

export default Branches;