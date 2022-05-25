import { IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useContext, useEffect } from "react";
import AppContext from "../../../data/AppContext";

import { createOutline } from "ionicons/icons";


const Branches: React.FC = () => {

  const appCtx = useContext(AppContext);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        {/* <IonButtons slot='start'>
                <IonMenuButton/>
            </IonButtons> */}
          <IonTitle>
            Branches
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Branches</h2>

        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton routerLink="/add-tree">
            <IonIcon icon={createOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default Branches;