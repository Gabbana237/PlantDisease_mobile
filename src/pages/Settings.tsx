import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonButton,
} from '@ionic/react';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Réglages</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Paramètres généraux</h2>

        <IonList>
          <IonItem lines="none">
            <IonLabel>Notifications</IonLabel>
            <IonToggle slot="end" checked={true} />
          </IonItem>

          <IonItem lines="none">
            <IonLabel>Mode sombre</IonLabel>
            <IonToggle slot="end" />
          </IonItem>

         <IonItem button detail routerLink="/profil/settings/language">
  <IonLabel>Langue</IonLabel>
  <IonLabel className="text-right text-emerald-600 dark:text-emerald-400" slot="end">
    Français
  </IonLabel>
</IonItem>

          <IonItem lines="none" button detail routerLink="/profil/about">
            <IonLabel>À propos</IonLabel>
          </IonItem>
        </IonList>

        <div className="mt-6">
          <IonButton expand="block" color="medium" routerLink="/profil">
            Retour au profil
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;