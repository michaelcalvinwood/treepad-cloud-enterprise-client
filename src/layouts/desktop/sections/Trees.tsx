import './Trees.scss';
import React from "react";
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage } from '@ionic/react';

import { addOutline } from 'ionicons/icons';

const Trees: React.FC = () => {
    return (
        <IonPage className='trees'>
            <IonContent className='ion-text-center'>
            <h2 className='ion-color-primary'>Trees</h2>
    
            <IonFab horizontal="end" vertical="bottom" slot="fixed">
                <IonFabButton routerLink="/add-tree">
                <IonIcon icon={addOutline} />
                </IonFabButton>
            </IonFab>
            </IonContent>
      </IonPage>
        
    )
}

export default Trees;
