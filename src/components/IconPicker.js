import './IconPicker.scss';
import React, { useState } from 'react';
import { IonSearchbar, IonSelect, IonSelectOption } from '@ionic/react';
import iconList from '../data/svg-filenames.json';

const IconPicker = props => {
    const [iconSet, setIconSet] = useState('solid');

    const {setIconName} = props;

    const getIconName = icon => {
        let loc = 5;
        let end = icon.indexOf('/', loc);
        const set = icon.substring(loc, end);
        let name = icon.substring(end + 1);
        loc = name.indexOf('.');
        name = name.substring(0, loc);
        return name;
    }

    const filteredList = iconList.filter(item => item.indexOf(`/svg/${iconSet}/`) !== -1);
    return (
        <div className='icon-picker'>
             <IonSelect 
                className='icon-picker__select' 
                value={iconSet} 
                placeholder={iconSet} 
                onIonChange={e => setIconSet(e.detail.value)}>
              <IonSelectOption value="astrit">astrit</IonSelectOption>
              <IonSelectOption value="brand">brand</IonSelectOption>
              <IonSelectOption value="devicons">devicons</IonSelectOption>
              <IonSelectOption value="duo-ant">duo-ant</IonSelectOption>
              <IonSelectOption value="duo-mdi">duo-mdi</IonSelectOption>
              <IonSelectOption value="duotone">duotone</IonSelectOption>
              <IonSelectOption value="fci">fci</IonSelectOption>
              <IonSelectOption value="feather">feather</IonSelectOption>
              <IonSelectOption value="filled-ant">filled-ant</IonSelectOption>
              <IonSelectOption value="filled-mdi">filled-mdi</IonSelectOption>
              <IonSelectOption value="grommet">grommet</IonSelectOption>
              <IonSelectOption value="icomoon">icomoon</IonSelectOption>
              <IonSelectOption value="light">light</IonSelectOption>
              <IonSelectOption value="md">md</IonSelectOption>
              <IonSelectOption value="octicons">octicons</IonSelectOption>
              <IonSelectOption value="outline-hero">outline-hero</IonSelectOption>
              <IonSelectOption value="outlined-ant">outlined-ant</IonSelectOption>
              <IonSelectOption value="outlined-mdi">outlined-mdi</IonSelectOption>
              <IonSelectOption value="regular">regular</IonSelectOption>
              <IonSelectOption value="remix">remix</IonSelectOption>
              <IonSelectOption value="round-mdi">round-mdi</IonSelectOption>
              <IonSelectOption value="sharp-mdi">sharp-mdi</IonSelectOption>
              <IonSelectOption value="solid">solid</IonSelectOption>
              <IonSelectOption value="solid-hero">solid-hero</IonSelectOption>
              <IonSelectOption value="thin">thin</IonSelectOption>
              <IonSelectOption value="twbs">twbs</IonSelectOption>
              <IonSelectOption value="typicon">typicon</IonSelectOption>
              <IonSelectOption value="vs">vs</IonSelectOption>
              <IonSelectOption value="weather">weather</IonSelectOption>
            </IonSelect>
            <IonSearchbar className='icon-picker__search'/>
            <div className='icon-picker__list-container'>
                <div className='icon-picker__icon-list'>
                    {filteredList.map(iconName => {
                        return (
                            <p 
                                onClick={() => setIconName(iconName)}
                                className='icon-picker__icon'
                                key={iconName}>{getIconName(iconName)}</p>
                        )
                    })}
                </div>
            </div>
            
        </div>
    )
}

export default IconPicker;