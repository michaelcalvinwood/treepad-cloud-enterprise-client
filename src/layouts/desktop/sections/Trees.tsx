import './Trees.scss';
import React from "react";
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage } from '@ionic/react';

import cloudIcon from '../../../assets/icons/cloud.svg';
import closeIcon from '../../../assets/icons/close.svg';

import { addOutline } from 'ionicons/icons';

const Trees: React.FC = () => {
    return (
        <IonPage className='trees'>
            <IonContent className='ion-text-center'>
            <p className='trees__title ion-color-primary'>Trees</p>
    
            <IonFab horizontal="end" vertical="bottom" slot="fixed">
                <IonFabButton routerLink="/add-tree">
                <IonIcon icon={addOutline} />
                </IonFabButton>
            </IonFab>
            </IonContent>
            <img className='trees__cloud' src={cloudIcon} />
            <img className='trees__close' src={closeIcon} />
      </IonPage>
        
    )
}

export default Trees;
