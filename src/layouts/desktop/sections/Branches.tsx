import './Branches.scss';
import React, { useContext, useState, useEffect } from "react";
import AppContext from '../../../data/AppContext';
import { Tree } from '../../../data/AppInterfaces';
import settingsIcon from '../../../assets/icons/settings.svg';
import cloudIcon from '../../../assets/icons/cloud.svg';
import closeIcon from '../../../assets/icons/close.svg';
import { IonSearchbar } from '@ionic/react';
import Branch from '../../../components/Branch';

let controlToggle = false;

const Branches: React.FC = () => {
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
        console.log('useEffect branches', appCtx.branches);

        // create a list of branches that have no name and have not already been checked before
        let nameList = [];
        let curBranches = appCtx.branches;
        curBranches.forEach((branch, i) => {
            if (!branch.name && !branch.nameChecked) {
                nameList.push(branch.id);
                curBranches[i].nameChecked = true;
            }
        })
    },
    [appCtx.branches])

    console.log('Branches', appCtx.branches);

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
                <p className='branches__title'>{appCtx.tree && appCtx.tree.treeName}</p>
            </div>

           <IonSearchbar 
                onIonChange={e => setSearch(e.detail!.value || '')}
                className='branches__search' 
                placeholder=''/>
            <div className="branches__list">
                {
                    appCtx.branches.map(branch => {
                        return <Branch 
                            key={branch.id+branch.name} 
                            id={branch.id} 
                            name={branch.name ? branch.name : ''} 
                            focused={appCtx.branch && appCtx.branch === branch.id ? true : false}
                            />
                    })
                }
            </div>
        </div>
    )
}

export default Branches;