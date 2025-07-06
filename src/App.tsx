import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Pages */
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import VerificationCode from './pages/VerificationCode';
import NewPassword from './pages/NewPassword';
import Tabs from './pages/Tabs';
import Settings from './pages/Settings';
import SettingsLanguage from './pages/SettingsLanguage';
import About from './pages/About';

/* Ionic core styles */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional utilities */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Dark mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Custom CSS */
import './theme/variables.css';
import './index.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Routes spécifiques */}
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/forgot" exact component={ForgotPassword} />
        <Route path="/verification" exact component={VerificationCode} />
        <Route path="/new-password" exact component={NewPassword} />
        <Route path="/home" exact component={Home} />

        {/* Paramètres */}
      <Route path="/profil/settings/language" component={SettingsLanguage} exact />
<Route path="/profil/settings" component={Settings} exact />
<Route path="/profil/about" component={About} exact />
        {/* Onglets principaux - Doit être en dernier */}
        <Route path="/tabs" component={Tabs} />

        {/* Redirection par défaut */}
        <Route exact path="/">
          <Redirect to="/tabs/scanner" />
        </Route>
       
        {/* Ajouté pour éviter les erreurs de fallback */}
        <Redirect to="/tabs/scanner" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;