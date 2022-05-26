import './Leaves.scss';
import React from "react";

import fullScreenIcon from '../../../assets/icons/full-screen.svg';
import normalScreenIcon from '../../../assets/icons/normal-screen.svg';


const Leaves: React.FC = () => {
    return (
        <div className="leaves">
            

            <img className='leaves__full-screen' src={fullScreenIcon} />
        </div>
        
    )
}

export default Leaves;
