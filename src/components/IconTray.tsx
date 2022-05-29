import './IconTray.scss';
import React from "react";

const IconTray: React.FC<{sectionHandler: (val: 'trees' | 'branches') => void, name: 'trees' | 'branches', icon: string }> = props => {
    return (
        <div className="icon-tray" onClick={() => props.sectionHandler(props.name)}>
            <img className="icon-tray__image" src={props.icon} />
        </div>
    )
    
}

export default IconTray;