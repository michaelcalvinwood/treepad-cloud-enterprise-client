/* Import the needed Routing components */
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel, setupIonicReact, IonMenuToggle, IonMenu, IonHeader, IonToolbar, IonTitle, IonItem, IonContent, IonList } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from "react-router-dom";

/* Import the pages */
import Trees from './pages/Trees';
import Branches from './pages/Branches';
import Leaves from './pages/Leaves';

/* Import icons for tabs */
import TreeIcon from '../../assets/icons/tree.svg';
import BranchIcon from '../../assets/icons/branch.svg';
import LeafIcon from '../../assets/icons/leaf.svg';

import Menus from './pages/Menus';
import AppContext from '../../data/AppContext';
import { useContext } from 'react';

const Mobile: React.FC = () => {

    const appCtx = useContext(AppContext);

    const handleTabWillChange = (e: CustomEvent) => {
        if(appCtx.menuPage !== e.detail.tab) appCtx.setMenuPage(e.detail.tab);
        
    };

    return (
        <IonApp>
        <IonReactRouter>
            <IonMenuToggle>  
                <Menus />
            </IonMenuToggle>
            <IonTabs onIonTabsWillChange={handleTabWillChange}>
                <IonRouterOutlet id="main"> 
                    <Route path="/trees">
                        <Trees />
                    </Route>
                    <Route path="/branches">
                        <Branches />
                    </Route>
                    <Route path="/leaves">
                        <Leaves />   
                    </Route>
                    <Redirect to="/trees" />
                </IonRouterOutlet>
                <IonTabBar slot='bottom'>
                    {/* Note: The tab prop in IonTabButton is just an identifier. Choose anything you like. */}
                    <IonTabButton href="/trees" tab="trees"> 
                        <IonIcon icon={TreeIcon} />
                        <IonLabel>Trees</IonLabel>
                    </IonTabButton>
                    <IonTabButton href="/branches" tab="branches">
                        <IonIcon icon={BranchIcon} />
                        <IonLabel>Branches</IonLabel>
                    </IonTabButton>
                    <IonTabButton href="/leaves" tab="leaves">
                        <IonIcon icon={LeafIcon} />
                        <IonLabel>Leaves</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
       </IonApp>
    )
}

export default Mobile;