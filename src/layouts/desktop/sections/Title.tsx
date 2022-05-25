import './Title.scss';
import React from "react";
import treepadIcon from '../../../assets/icons/treepadcloud-icon.svg';

const Title: React.FC = () => {
    return (
       <div className='title'>
            <div className="title__logo-container">
                <img className='title__logo-image' src={treepadIcon} />
                <h1 className='title__logo-name'>TreePad Cloud</h1>
            </div>
       </div>
    )
}

export default Title;