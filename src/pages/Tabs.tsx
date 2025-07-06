import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { homeOutline, listOutline, personOutline } from 'ionicons/icons';

import Scanner from './Scanner';
import Historique from './Historique';
import Profil from './Profil';

const Tabs: React.FC = () => {
  return (
    <>
      <IonRouterOutlet>
        <Route path="/tabs/scanner" component={Scanner} exact />
        <Route path="/tabs/historique" component={Historique} exact />
        <Route path="/tabs/profil" component={Profil} exact />

        <Route exact path="/tabs">
          <Redirect to="/tabs/scanner" />
        </Route>
      </IonRouterOutlet>

      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tabs/scanner" component={Scanner} exact />
          <Route path="/tabs/historique" component={Historique} exact />
          <Route path="/tabs/profil" component={Profil} exact />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" color="light">
          <IonTabButton tab="scanner" href="/tabs/scanner">
            <IonIcon icon={homeOutline} />
            <IonLabel>Scanner</IonLabel>
          </IonTabButton>

          <IonTabButton tab="historique" href="/tabs/historique">
            <IonIcon icon={listOutline} />
            <IonLabel>Historique</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profil" href="/tabs/profil">
            <IonIcon icon={personOutline} />
            <IonLabel>Profil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

export default Tabs;