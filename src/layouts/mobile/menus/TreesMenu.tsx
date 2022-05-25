import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import React from "react";

import TreeIcon from '../../../assets/icons/tree.svg';

const TreesMenu: React.FC = () => {
    return (
        <IonItem className="menus__item">
            <IonButton fill='outline' className="menus__button" slot='start'>
                <IonIcon className="ion-special-background-secondary menus__icon" slot="icon-only" icon={TreeIcon} />
            </IonButton>
        </IonItem>
    )
}

export default TreesMenu;