import React, { useContext } from 'react';
import AppContext from '../../../data/AppContext';
import AddTree from '../../../modals/AddTree';

const Modals: React.FC = () => {
    const appCtx = useContext(AppContext);

    const closeTreeModal = () => {
        appCtx.setModals(prev => {
            prev.addTree.active = false;
            return {...prev}
        })
    }

    return (
        <div className='modals'>
            {appCtx.modals.addTree.active! && 
                <AddTree />
            }
        </div>
    )
}

export default Modals;