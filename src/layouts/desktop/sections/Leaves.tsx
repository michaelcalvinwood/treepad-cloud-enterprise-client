import './Leaves.scss';
import React, { useContext, useEffect, useState } from "react";
import AppContext from '../../../data/AppContext';

import fullScreenIcon from '../../../assets/icons/full-screen.svg';
import normalScreenIcon from '../../../assets/icons/normal-screen.svg';
import settingsIcon from '../../../assets/icons/settings.svg';
import cloudIcon from '../../../assets/icons/cloud.svg';
import * as socketIo from '../../../utils/resourceServerEmit';
import ModuleDefault from '../../../modules/ModuleDefault';
import * as dbUtil from '../../../utils/debug-util';
import ModuleQuill from '../../../modules/ModuleQuill';



const Leaves: React.FC = () => {
    //TODO: add a timestamp and every hour check to see if there are new modules.   
    
    const [isFullScreen, setIsFullScreen] = useState(false);

    const appCtx = useContext(AppContext);
    const { module, modules } = appCtx;

    const fn = 'Leaves.tsx ';

    const setFullScreen = () => setIsFullScreen(true);

    const setNormalScreen = () => setIsFullScreen(false);

    const leavesClassName = () => {
        let cname = 'leaves';

        let ammend = ' leaves';

        if (!appCtx.desktopSections.trees) ammend += '--no-trees';
        if (!appCtx.desktopSections.branches) ammend += '--no-branches';
        if (!appCtx.desktopSections.controls) ammend += '--no-controls';
        
        if (ammend !== ' leaves') cname += ammend;

        if (isFullScreen) cname += ' leaves--full-screen';
        return cname;
    }

    useEffect(() => {
        
        if (modules.length === 0 && appCtx.userInfo.resourceSocket) {
            socketIo.getAllModules(appCtx);
        } 
    }, [] )

    dbUtil.eventDebug('getAllModules', {
        p: fn,
        modules
    })

    return (
        <div className={leavesClassName()}>
            <div className='leaves__actions'>
                <img 
                    className='leaves__cloud' 
                    src={cloudIcon} />
                {/* <img
                    className='leaves__settings' 
                    src={settingsIcon} /> */}
               { isFullScreen ?
                <img 
                className='leaves__normal-screen'
                onClick={setNormalScreen} 
                src={normalScreenIcon} /> :
                <img 
                    className='leaves__full-screen'
                    onClick={setFullScreen} 
                    src={fullScreenIcon} />
               }
            </div>
            <div 
                className='leaves__module' >
                { }
                {!module && <ModuleDefault />}
                {module && module.id === 1 && <ModuleQuill />}

                {/* IMPORTANT: Use module ID # so that module names and icons can change. Or even remove a module from service by not including its id. */}
            </div>
            


        </div>
        
    )
}

export default Leaves;
