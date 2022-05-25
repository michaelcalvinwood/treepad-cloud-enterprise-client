import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import React from "react";

import TreeIcon from '../../../assets/icons/tree.svg';

const TreesMenu: React.FC = () => {
    return (
        <IonItem button routerLink="/settings" routerDirection="none">
            <IonIcon className="ion-special-background-secondary" slot="start" icon={TreeIcon} />
            <IonLabel></IonLabel>
    </IonItem>
    )
}

export default TreesMenu;