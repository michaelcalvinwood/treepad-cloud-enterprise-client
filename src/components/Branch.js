import './Branch.scss';
import React, { useContext, useEffect, useRef } from 'react';
import * as socketIo from '../utils/api-socket-io';
import AppContext from '../data/AppContext';
import * as branchUtil from '../utils/branch-util';

const Branch = props => {
    const {id, name, focused} = props;
    const appCtx = useContext(AppContext);
    const inputRef = useRef();

    console.log('Branch', props);

    const handleBranchNameChange = e => {
        console.log('handleBranchNameChange');
        
        const info = {
            socket: appCtx.resourceSocket,
            branchId: id,
            branchName: e.target.value,
            treeId: appCtx.tree.treeId,
            ancestors: [],
            token: appCtx.token
        }
        branchUtil.setBranchName(id, e.target.value || '', appCtx.setBranches);
        socketIo.setBranchName(info);
    }

    const setFocus = branchId => {
        appCtx.setBranch(branchId);
    }

    useEffect(() => {
        if (focused) inputRef.current.focus();
    })

    return (
        <div className="branch" key={id+name}>
            <input
                ref={inputRef}
                onChange={handleBranchNameChange}
                onFocus={() => setFocus(id)}
                className='branch__input' 
                type='text' 
                value={name}
                placeholder={name ? '' : 'enter name'} />
        </div>
    )
}

export default Branch;