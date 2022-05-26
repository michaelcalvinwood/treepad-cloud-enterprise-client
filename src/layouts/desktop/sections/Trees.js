import './Trees.scss';
import React, { useContext } from "react";
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage } from '@ionic/react';
import AppContext  from '../../../data/AppContext';


import cloudIcon from '../../../assets/icons/cloud.svg';
import closeIcon from '../../../assets/icons/close.svg';


import { addOutline } from 'ionicons/icons';

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


    return (
        <IonPage className={treesClassName()}>
            <IonContent className='ion-text-center'>
            <p className='trees__title ion-color-primary'>Trees</p>
    
            <IonFab horizontal="end" vertical="bottom" slot="fixed">
                <IonFabButton routerLink="/add-tree">
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
        
    )
}

export default Trees;
