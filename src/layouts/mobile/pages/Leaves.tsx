import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useContext, useEffect } from "react";
import AppContext from "../../../data/AppContext";

const Leaves: React.FC = () => {
  const appCtx = useContext(AppContext);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot='end'>
                    <IonMenuButton/>
                </IonButtons>
          <IonTitle>
            Leaves
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Leaves</h2>
      </IonContent>
    </IonPage>
  )
}

export default Leaves;