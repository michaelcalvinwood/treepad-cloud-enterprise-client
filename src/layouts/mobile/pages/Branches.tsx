import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useContext, useEffect } from "react";
import AppContext from "../../../data/AppContext";

const Branches: React.FC = () => {

  const appCtx = useContext(AppContext);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot='start'>
                <IonMenuButton/>
            </IonButtons>
          <IonTitle>
            Branches
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Branches</h2>
      </IonContent>
    </IonPage>
  )
}

export default Branches;