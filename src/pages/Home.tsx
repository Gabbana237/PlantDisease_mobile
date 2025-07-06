import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonCard,
} from '@ionic/react';
import { homeOutline, listOutline, personOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>La Clinique Des Plantes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-6">
            Bienvenue dans l'appli
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
            Utilisez l'application pour scanner vos plantes, identifier leurs maladies et consulter votre historique.
          </p>

          <IonCard routerLink="/tabs/scanner" className="w-full max-w-sm shadow-lg cursor-pointer bg-white dark:bg-gray-800">
            <div className="p-6">
              <IonButton expand="block" color="success">
                Commencer
              </IonButton>
            </div>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;