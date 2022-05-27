import React, { useContext } from 'react';
import AppContext from '../../../data/AppContext';
import AddTree from '../../../modals/AddTree';

const Modals: React.FC = () => {
    const appCtx = useContext(AppContext);

    const closeTreeModal = () => {
        appCtx.setModals(prev => {
            prev.addTree = false;
            return {...prev}
        })
    }

    return (
        <div className='modals'>
            {appCtx.modals!.addTree && 
                <AddTree closeModal={closeTreeModal}/>
            }
        </div>
    )
}

export default Modals;