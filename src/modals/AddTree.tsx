import './AddTree.scss';
import React, {useContext, useState} from 'react';
import AppContext from '../data/AppContext';
import { IonButton, IonInput, IonItem, IonLabel, IonSearchbar, IonTextarea, IonToast } from '@ionic/react';
import IconPicker from '../components/IconPicker';
import axios from 'axios';

const AddTree: React.FC<{closeModal: () => void}> = (props) => {
    const [icon, setIcon] = useState<string>('/svg/tree.svg');
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [treeName, setTreeName] = useState<string>('');
    const [treeDesc, setTreeDesc] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const appCtx = useContext(AppContext);

    const setIconName = (name: string) => {
        setIcon(name);
    }

    const createTree = () => {
        if (!treeName) return setMessage('Please enter a tree name');
        console.log ("AddTree icon", icon);

        const request = {
            url: `${appCtx.server}/trees`,
            method: 'post',
            data: {
                token: appCtx.token,
                icon,
                treeName,
                treeDesc: treeDesc || ''
            }
        }

        axios(request)
        .then(res => {
            appCtx.setModals(prev => {
                prev.addTree = false;
                return{...prev}
            })
        })
        .catch(err => {
            console.log(err);

            if(!err.response.data) setMessage(err.message);
            else setMessage(err.response.data);
        })
    }
   
    return (
        <div className='add-tree'>
            <div className='add-tree__content'>
                <img 
                    onClick={() => setShowIconPicker(prev => !prev)}
                    className='add-tree__icon' 
                    src={appCtx.server + icon} 
                />
                <p className='add-tree__instructions'>click to change</p>
                <IonItem className='add-tree__input-tree-name'>
                    <IonLabel position='floating'>Tree Name</IonLabel>
                    <IonInput
                        onIonChange={e => setTreeName(e.detail!.value || '')}  
                        type='text' />
                </IonItem>
                <IonItem className='add-tree__input-tree-description'>
                    <IonLabel position='floating'>Tree Description (optional)</IonLabel>
                    <IonTextarea onIonChange={e => setTreeDesc(e.detail!.value || '')}/>
                </IonItem>
                <IonButton 
                    onClick={createTree}
                    className='add-tree__button-create'>
                    Create
                </IonButton>
                {showIconPicker && 
                    <IconPicker 
                        setIconName={setIconName}
                        setShowIconPicker={setShowIconPicker}/>
                }
                <IonButton 
                    onClick={() => appCtx.setModals(prev => {
                        prev.addTree = false;
                        return{...prev}
                    })}
                    className='add-tree__button-close'
                    >
                    Close
                </IonButton>
            </div>
            <IonToast
                position='top'
                color="secondary"
                message={message}
                isOpen={!!message}
                duration={3000}
                onDidDismiss={() => setMessage('')} />
        </div>
    )
}

export default AddTree;