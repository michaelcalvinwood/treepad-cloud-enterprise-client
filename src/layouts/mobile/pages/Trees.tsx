import { IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useContext, useEffect } from "react";
import AppContext from "../../../data/AppContext";

import { add } from 'ionicons/icons';

const Trees: React.FC = () => {
  const appCtx = useContext(AppContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        {/* <IonButtons slot='start'>
                <IonMenuButton/>
            </IonButtons> */}
          <IonTitle>
            Trees
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Trees</h2>

        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton routerLink="/add-tree">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default Trees;