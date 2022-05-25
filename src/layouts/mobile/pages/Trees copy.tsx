import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const Trees: React.FC = () => {

  return (
    <IonPage id='treesMenu'>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot='start'>
                <IonMenuButton/>
            </IonButtons>
          <IonTitle>
            Trees
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Trees</h2>
      </IonContent>
    </IonPage>
  )
}

export default Trees;