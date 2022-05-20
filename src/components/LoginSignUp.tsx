import './LoginSignUp.scss';
import { IonButton, IonInput, IonItem, IonLabel, IonToast } from '@ionic/react';
import React, { useState, useRef } from 'react';
import axios from 'axios'
import * as EmailValidator from 'email-validator';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import zxcvbn from 'zxcvbn';

const LoginSignUp: React.FC = () => {
    const [mode, setMode] = useState<string>('login');
    const [toast, setToast] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
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

    const handleSubmit = () => {
        const user = userRef.current!.value;

        if (!user) {
            setToast('Please enter a user name.');
            return;
        }

        const email = emailRef.current!.value;

        if (!email) {
            setToast('Please enter an email address.');
            return;
        }

        const isValidEmail = EmailValidator.validate(email.toString());

        if (!isValidEmail) {
            setToast('Please enter a valid email address.')
        }

        const passwordVal = passRef.current!.value;

        if (!passwordVal) {
            setToast('Please enter a password.');
            return;
        }

        const testPassword = zxcvbn(passwordVal);

        if (testPassword.score < 4) {
            setToast('Please use a strong password');
        }
    }

    return (
        <div className="login">
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
                    { mode === 'register' &&
                        <IonButton 
                        className='login__button'
                        onClick={handleSubmit}>Submit</IonButton>
                    }
                    <IonButton 
                        className='login__button'
                        onClick={handleLogin}>Login</IonButton>
                    { mode === 'login' &&
                        <IonButton 
                        className='login__button'
                        onClick={handleRegister}>Register</IonButton>
                    }   
                </div>
            </div>
            <IonToast 
                color="secondary"
                position='middle'
                message={toast}
                isOpen={!!toast}
                duration={2500}
                onDidDismiss={() => setToast('')}/>
        </div>
    )
}

export default LoginSignUp;