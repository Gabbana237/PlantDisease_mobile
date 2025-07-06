import {
  IonPage,
  IonContent,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { cameraOutline, videocamOutline } from 'ionicons/icons';

const Scanner: React.FC = () => {
  const handleScan = () => {
    // Ici tu peux appeler la caméra ou la vidéo
    alert('Démarrage de la caméra... (à connecter à votre API IA)');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Scanner une plante</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <IonCard className="w-full max-w-md shadow-lg rounded-xl bg-white dark:bg-gray-800">
            <IonCardContent className="p-6">
              <IonIcon icon={videocamOutline} className="text-6xl text-emerald-600 mb-4 mx-auto" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Filmez votre plante</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Prenez une vidéo ou une photo claire de la plante malade. Notre système détectera sa maladie.
              </p>
              <IonButton expand="block" onClick={handleScan} color="success">
                <IonIcon slot="start" icon={cameraOutline} />
                Prendre une photo / vidéo
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Scanner;