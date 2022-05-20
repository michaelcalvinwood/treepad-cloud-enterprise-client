import { useState, useEffect, useContext } from 'react';

import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AppContext from './data/AppContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Desktop from './layouts/desktop/Desktop';
import Mobile from './layouts/mobile/Mobile';
import LoginSignUp from './components/LoginSignUp';

interface WindowSize {
  innerHeight: number;
  innerWidth: number;
}

setupIonicReact();

let staticVal: boolean = false;

// App selects the layout based on the current window width

const App: React.FC = () => {
  const [windowSize, setWindowSize] = useState<WindowSize | null>(null);

  const appCtx = useContext(AppContext);

  const windowResize = () => {
    console.log('windowSize', window.innerWidth, window.innerHeight)
    setWindowSize({
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth
    })
  };
  
  useEffect(() => {
    if (staticVal) return;
    staticVal = true;
  
    windowResize();
    window.addEventListener('resize', windowResize);

    document.title="TreePad Cloud";
  
  }, [])
  return (
    <>
        {appCtx.isLoggedIn && window.innerWidth < 786 && <Mobile />}
        {appCtx.isLoggedIn && window.innerWidth >= 786 && <Desktop />}
        {!appCtx.isLoggedIn && <LoginSignUp />}
    </>
 )};

export default App;
