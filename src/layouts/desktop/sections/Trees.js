import './Trees.scss';
import React, { useContext, useState, useEffect } from "react";
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonSearchbar } from '@ionic/react';
import AppContext  from '../../../data/AppContext';
import TreeCard from '../../../components/TreeCard';

import AddTree from '../../../modals/AddTree';

import cloudIcon from '../../../assets/icons/cloud.svg';
import closeIcon from '../../../assets/icons/close.svg';
import settingsIcon from '../../../assets/icons/settings.svg';

import { addOutline } from 'ionicons/icons';
import { getTrees } from '../../../utils/api-axios';
import TreesMenu from '../../mobile/menus/TreesMenu';

const Trees = () => {
    const [search, setSearch] = useState('');
    const [settings, setSettings] = useState(false);
    
    const appCtx = useContext(AppContext);
    

    const handleTreeClose = () => {
        appCtx.setDesktopSections(prev => {
            prev.trees = false;
            return ({...prev});
        })
    }

    console.log('trees', appCtx.desktopSections);

    const treesClassName = () => {
        if (appCtx.desktopSections.trees) return 'trees';
        else return 'trees trees--inactive'
    }

    useEffect(()=>{
       getTrees(appCtx.server, appCtx.token, appCtx.setTreeInfo)
    }, []);

    return (
        <>
            <IonPage className={treesClassName()}>
                <IonContent className='ion-text-center'>
                <div className='trees__actions'>
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
                </div>
                <p className='trees__title ion-color-primary'>Trees</p>
                <IonSearchbar 
                    onIonChange={e => setSearch(e.detail.value || '')}
                    className='trees__search ion-text-left' 
                    placeholder=''
                    />
                {appCtx.treeInfo.map(tree => {
                    return (
                        <TreeCard 
                            key={tree.tree_id}
                            server={appCtx.server}
                            icon={tree.icon}
                            treeName={tree.tree_name}
                            treeId={tree.tree_id}
                            ownerName={tree.owner_name}
                            active={tree.tree_id === appCtx.curTree}
                            actions={settings}
                        />
                    )
                })
                }
        
                <IonFab horizontal="end" vertical="bottom" slot="fixed">
                    <IonFabButton onClick={() => appCtx.setModals(prev => {
                        prev.addTree = true;
                        return {...prev}
                    })}>
                    <IonIcon icon={addOutline} />
                    </IonFabButton>
                </IonFab>
                </IonContent>
        </IonPage>
    </>
    )
}

export default Trees;
