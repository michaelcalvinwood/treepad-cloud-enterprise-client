import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from "@ionic/react";
import React, { useContext, useEffect } from "react";

import { pulseOutline, closeCircleOutline, closeOutline } from 'ionicons/icons';
import AppContext from "../../../data/AppContext";


import BranchIcon from '../../../assets/icons/branch.svg';
import LeafIcon from '../../../assets/icons/leaf.svg';
import { RouteComponentProps, useHistory, withRouter } from 'react-router';
import TreesMenu from "../menus/TreesMenu";

const Menus: React.FC = () => {
    const appCtx = useContext(AppContext);

    useEffect(() => {
        console.log(appCtx.menuPage);
    }, [appCtx.menuPage]);

    return (
        <IonMenu contentId="main">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <IonItem className="cursor-pointer">
                            <IonIcon slot="start" icon={closeOutline} />
                            <IonLabel></IonLabel>
                        </IonItem>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {/* the props button and routerLink tell ionic that you want the item to act as if it were a button */}
                    <IonMenuToggle>
                        {appCtx.menuPage === 'trees' && <TreesMenu />}
                        {appCtx.menuPage === 'branches' &&
                            <IonItem button routerLink="/settings" routerDirection="none">
                                <IonIcon className="ion-special-background-secondary" slot="start" icon={BranchIcon} />
                                <IonLabel></IonLabel>
                            </IonItem>
                        }
                        {appCtx.menuPage === 'leaves' &&
                            <IonItem button routerLink="/settings" routerDirection="none">
                                <IonIcon className="ion-special-background-secondary" slot="start" icon={LeafIcon} />
                                <IonLabel></IonLabel>
                            </IonItem>
                        }
                    </IonMenuToggle>
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default Menus;