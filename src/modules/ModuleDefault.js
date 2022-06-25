import './ModuleDefault.scss';
import React, { useContext } from "react";
import AppContext from '../data/AppContext';
import App from '../App';
import { IonButton, IonIcon } from '@ionic/react'; 
import * as monitor from '../utils/eventMonitor';
import * as resourceServer from '../utils/resourceServerEmit';

const ModuleDefault = () => {
    const appCtx = useContext(AppContext);
    const { modules } = appCtx;
    const { server } = appCtx.userInfo;

    const fn = 'ModuleDefault.js ';

    monitor.events(['displayModules'], {p: 'ModuleDefault.js', modules, server});

    modules.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    });

   const selectedModule = id => {
        const selectedModule = modules.find(m => m.id === id);
        if (selectedModule) resourceServer.setCurModule(id, appCtx);
   }

    return (
        <div className='module-default'>
            <h1
                className='module-default__title'>
                Select a Module
            </h1>
            <div
                className='module-default__list'>
                {
                    modules && modules
                    .map(m => {
                        return (
                            <div
                                key={m.name}
                                onClick={()=>{selectedModule(m.id)}}
                                draggable='true'
                                className='module-default__button'
                                color="primary"
                                fill='outline'>
                                <img 
                                    className='module-default__icon'
                                    src={server+m.icon} />
                                {m.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ModuleDefault;