import './LoginSignUp.scss';
import { IonButton, IonInput, IonItem, IonLabel, IonToast } from '@ionic/react';
import React, { useState, useRef, useContext } from 'react';
import axios from 'axios'
import * as EmailValidator from 'email-validator';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import zxcvbn from 'zxcvbn';
import treepadIcon from '../assets/icons/treepadcloud-icon.svg';
import AppContext from '../data/AppContext';

// TODO: Add confirmation password to registration and only send if the two passwords match

const LoginSignUp: React.FC = () => {
    const [mode, setMode] = useState<string>('login');
    const [toast, setToast] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const appCtx = useContext(AppContext);
    
    const userRef = useRef<HTMLIonInputElement>(null);
    const emailRef = useRef<HTMLIonInputElement>(null);
    const passRef = useRef<HTMLIonInputElement>(null);

    const handleRegister = () => {
        setMode('register');
    }

    const handleLogin = () => {
        setMode('login');
    }

    const handlePassword = () => {
        const passwordVal = passRef.current!.value;

        if (!passwordVal) return;

        setPassword(passwordVal.toString());
    }

    const registerUser = (user: string, email: string, password: string) => {
        const request = {
            url: `${process.env.REACT_APP_BASE_URL}/authentication/register`,
            method: 'post',
            data: {
                user,
                email,
                password
            }
        }
        axios(request)
        .then(res => {
            setToast(res.data);
            return;

        })
        .catch(err => {
            console.log(err.response.data);
            if (!err.response!.data) {
                setToast(err.message!);
                return;
            } else {
                setToast(err.response.data);
                return;
            }
        })

        return;
    }

    const loginUser = (user: string, password: string) => {
        const request = {
            url: `${process.env.REACT_APP_BASE_URL}/authentication/login`,
            method: 'post',
            data: {
                user,
                password
            }
        }
        axios(request)
        .then(res => {
            // save session token to local storage

            // sessionStorage.authToken = res.data.token;
            //     sessionStorage.userId = res.data.userId.toString();
            //     sessionStorage.userName = userName;
            //     const userId = Number(res.data.userId);
            //     this.props.setUser(userId, userName);

            // set user to logged in
            appCtx.setIsLoggedIn(true);

            setToast(res.data);
            return;

        })
        .catch(err => {
            console.log(err.response.data);
            if (!err.response!.data) {
                setToast(err.message!);
                return;
            } else {
                setToast(err.response.data);
                return;
            }
        })

        return;
    }

    const handleSubmit = () => {
        const user = userRef.current!.value;

        if (mode === 'register' && !user) {
            setToast('Please enter a user name.');
            return;
        }

        let email='', isValidEmail;
        if (mode === 'reqister') {
            if (emailRef.current && emailRef.current.value)
            email = emailRef.current!.value?.toString();

            if (!email) {
                setToast('Please enter an email address.');
                return;
            }
    
            isValidEmail = EmailValidator.validate(email.toString());
    
            if (!isValidEmail) {
                setToast('Please enter a valid email address.');
                return;
            }
        }
        
        const passwordVal = passRef.current!.value;

        if (!passwordVal) {
            setToast('Please enter a password.');
            return;
        }

        const testPassword = zxcvbn(passwordVal);

        if (testPassword.score < 4) {
            setToast('Please use a strong password');
            return;
        }

        console.log('mode', mode);

        switch(mode) {
            case 'register':
                return registerUser(user!.toString(), email.toString(), password);
            
            case 'login':
                return loginUser(user!.toString(), password);
        }
        
    }

    return (
        <div className="login">
            
            <div className='login__center-box'>
                <div className='login__intro'>
                    <img className='login__logo' src={treepadIcon} />
                    <h1 className='login__product-name'>TreePad Cloud</h1>
                </div>
                <h2 className='login__title'>
                    { mode === 'login' ? 'Login' : 'Register'}
                </h2>
                <div className='login__container'>
                    <IonItem>
                        <IonLabel position="floating">User Name</IonLabel>
                        <IonInput type="text" ref={userRef}/>
                    </IonItem>
                    { mode === 'register' && 
                        <IonItem>
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput type="email" ref={emailRef}/>
                        </IonItem>
                    }
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput 
                            type="password" 
                            ref={passRef} 
                            value={password} 
                            onIonChange={handlePassword}/>
                    </IonItem>
                    { mode === 'register' &&
                        <PasswordStrengthMeter password={password}/> }
                    <div className='login__button-container'>
                        
                        <IonButton 
                        className='login__button login__submit'
                        onClick={handleSubmit}>Submit</IonButton>
                    
                        { mode === 'login' ? 
                            <IonButton 
                            fill='outline'
                            className='login__button'
                            onClick={handleRegister}>Register</IonButton> :

                            <IonButton 
                            fill='outline'
                            className='login__button'
                            onClick={handleLogin}>Login</IonButton>
                        }   
                    </div>
                </div>
            </div>
        
            <IonToast 
                color="secondary"
                position='middle'
                message={toast}
                isOpen={!!toast}
                duration={2500}
                onDidDismiss={() => setToast('')}/>
            { mode === 'login' && appCtx.windowDimensions.height >= 600 &&
                <IonButton className="login__recovery" fill="outline">Password Recovery</IonButton>
            }
    </div>
    )
}

export default LoginSignUp;