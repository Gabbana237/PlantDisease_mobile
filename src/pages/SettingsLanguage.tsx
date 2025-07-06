import {
  IonPage,
  IonContent,
  IonHeader,
  IonButton,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonLabel,
} from '@ionic/react';

const SettingsLanguage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Langue</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonList>
          <IonItem lines="none">
            <IonRadioGroup value="fr">
              <IonItem>
                <IonLabel>Français</IonLabel>
                <IonRadio value="fr" slot="start" />
              </IonItem>
              <IonItem>
                <IonLabel>Anglais</IonLabel>
                <IonRadio value="en" slot="start" />
              </IonItem>
            </IonRadioGroup>
          </IonItem>
        </IonList>

        <div className="mt-6">
          <IonButton expand="block" color="medium" routerLink="/profil/settings">
            Retour aux réglages
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SettingsLanguage;