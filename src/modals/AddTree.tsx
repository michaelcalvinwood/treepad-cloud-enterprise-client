import './AddTree.scss';
import React, {useContext, useState} from 'react';
import AppContext from '../data/AppContext';
import { IonButton, IonInput, IonItem, IonLabel, IonSearchbar, IonTextarea } from '@ionic/react';
import IconPicker from '../components/IconPicker';

const AddTree: React.FC<{closeModal: () => void}> = (props) => {
    const [icon, setIcon] = useState<string>('/svg/tree.svg');
    const [showIconPicker, setShowIconPicker] = useState(false);

    const appCtx = useContext(AppContext);

    const setIconName = (name: string) => {
        setIcon(name);
    }

    console.log ("AddTree icon", icon);

    return (
        <div className='add-tree'>
            <div className='add-tree__content'>
                <img 
                    onClick={() => setShowIconPicker(prev => !prev)}
                    className='add-tree__icon' 
                    src={appCtx.server + icon} 
                />
                <p className='add-tree__instructions'>click icon to change</p>
                <IonItem className='add-tree__input-tree-name'>
                    <IonLabel position='floating'>Tree Name</IonLabel>
                    <IonInput  type='text' />
                </IonItem>
                <IonItem className='add-tree__input-tree-description'>
                    <IonLabel position='floating'>Tree Description</IonLabel>
                    <IonTextarea />
                </IonItem>
                <IonButton className='add-tree__button-create'>Create</IonButton>
                {showIconPicker && 
                    <IconPicker 
                        setIconName={setIconName}/>
                }
                <IonButton className='add-tree__button-close'>Close</IonButton>
            </div>

        </div>
    )
}

export default AddTree;