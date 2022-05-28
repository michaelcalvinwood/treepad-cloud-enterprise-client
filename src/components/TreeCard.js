import './TreeCard.scss';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import React from "react";

const TreeCard = props => {
    const {treeName, ownerName, server, icon, active} = props;

    return (
        <IonCard className={active ? 'tree-card tree-card--active' : 'tree-card'}>
            <img 
                className='tree-card__image'
                src={`${server}${icon}`} />
            <IonCardHeader className='tree_card__header'>
                <IonCardTitle className='tree_card__title'>{treeName}</IonCardTitle>
                <IonCardSubtitle className='tree_card__subtitle'>{ownerName}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
            
        </IonCardContent>
    </IonCard>
    )
}

export default TreeCard;