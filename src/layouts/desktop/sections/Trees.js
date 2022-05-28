import './Trees.scss';
import React, { useContext, useState, useEffect } from "react";
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage } from '@ionic/react';
import AppContext  from '../../../data/AppContext';
import TreeCard from '../../../components/TreeCard';

import AddTree from '../../../modals/AddTree';

import cloudIcon from '../../../assets/icons/cloud.svg';
import closeIcon from '../../../assets/icons/close.svg';

import { addOutline } from 'ionicons/icons';
import { getTrees } from '../../../utils/api-axios';
import TreesMenu from '../../mobile/menus/TreesMenu';

const Trees = () => {
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
                <p className='trees__title ion-color-primary'>Trees</p>
                {appCtx.treeInfo.map(tree => {
                    return (
                        <TreeCard 
                            key={tree.tree_id}
                            server={appCtx.server}
                            icon={tree.icon}
                            treeName={tree.tree_name}
                            ownerName={tree.owner_name}
                            active={tree.tree_id === appCtx.curTree}
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
                <img className='trees__cloud' src={cloudIcon} />
                <img
                    onClick={handleTreeClose} 
                    className='trees__close' 
                    src={closeIcon} />
        </IonPage>
    </>
    )
}

export default Trees;
