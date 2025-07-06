import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonAvatar,
  IonButton,
  IonMenuToggle,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
} from '@ionic/react';
import { personOutline, settingsOutline, logOutOutline } from 'ionicons/icons';

const Profil: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Votre Profil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Informations utilisateur avec dropdown */}
        <div className="flex flex-col items-center mb-6 relative">
          <IonAvatar className="w-20 h-20 mb-3">
            <img src="https://i.pravatar.cc/200 " alt="avatar" />
          </IonAvatar>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Jean Jardinier</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">jean@jardin.fr</p>

          {/* Dropdown simulé avec IonItemSliding */}
          <IonItemSliding className="w-full max-w-xs mt-4 shadow-md rounded-lg">
            <IonItemOptions side="end">
              <IonItemOption expandable routerLink="/profil/settings" color="primary">
                Paramètres
              </IonItemOption>
              <IonItemOption expandable routerLink="/login" color="danger">
                Déconnexion
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        </div>

        {/* Menu principal */}
        <IonList>
          <IonItem button routerLink="/profil/informations">
            <IonIcon icon={personOutline} slot="start" />
            <IonLabel>Mes informations</IonLabel>
          </IonItem>
          <IonItem button routerLink="/profil/settings">
            <IonIcon icon={settingsOutline} slot="start" />
            <IonLabel>Réglages</IonLabel>
          </IonItem>
          <IonItem button routerLink="/login">
            <IonIcon icon={logOutOutline} slot="start" />
            <IonLabel>Déconnexion</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Profil;