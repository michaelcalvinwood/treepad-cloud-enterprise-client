import './ModuleDefault.scss';
import React, { useContext } from "react";
import AppContext from '../data/AppContext';
import App from '../App';
import { IonButton, IonIcon } from '@ionic/react'; 
import * as dbUtil from '../utils/debug-util';

const ModuleDefault = () => {
    const appCtx = useContext(AppContext);
    const { modules } = appCtx;

    const fn = 'ModuleDefault.js ';

    dbUtil.eventDebug('getAllModules', {
        p: fn,
        icon: appCtx.userInfo.server+'/svg/quill.svg'
    })

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
                    .sort()
                    .map(m => {
                        return (
                            <div
                                key={m.name}
                                className='module-default__button'
                                color="primary"
                                fill='outline'>
                                <img 
                                    className='module-default__icon'
                                    src={appCtx.userInfo.server+'/svg/quill.svg'} />
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