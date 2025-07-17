import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonImg,
  IonButton,
  IonIcon,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Storage } from '@capacitor/storage';

// Définition du type pour les données reçues via la navigation
interface PredictionData {
  plant: string;
  disease: string;
  status: string;
  confidence: string;
}

interface ResultState {
  prediction: PredictionData;
  image: string;
}

const ResultPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [image, setImage] = useState<string | null>(null);

  // Vérifie si on a bien reçu des données via navigate()
  useEffect(() => {
    if (location.state && typeof location.state === 'object') {
      const state = location.state as ResultState;

      if ('prediction' in state && 'image' in state) {
        const { prediction, image } = state;

        setPrediction(prediction);
        setImage(image);

        // Sauvegarde immédiatement dans Capacitor
        saveToHistory(prediction, image);
      } else {
        console.warn("Données incomplètes dans location.state");
        loadLastScanFromStorage(); // Optionnel : charge la dernière sauvegarde
      }
    } else {
      console.warn("Aucune donnée reçue via la navigation");
      loadLastScanFromStorage(); // Charge depuis Capacitor si disponible
    }
  }, [location.state]);

  // Sauvegarde dans l'historique
  const saveToHistory = async (predictionData: PredictionData, imageData: string) => {
    const key = `scan_${Date.now()}`;
    const dataToSave = {
      id: key,
      timestamp: new Date().toISOString(),
      plant: predictionData.plant,
      disease: predictionData.disease,
      status: predictionData.status,
      confidence: predictionData.confidence,
      image: imageData,
    };

    await Storage.set({
      key,
      value: JSON.stringify(dataToSave),
    });

    console.log('Résultat sauvegardé dans Capacitor');
  };

  // Optionnel : charge la dernière analyse sauvegardée
  const loadLastScanFromStorage = async () => {
    const result = await Storage.keys(); // ✅ Capacitor retourne un objet
    const allKeys = result.keys; // ✅ Extraction du tableau de clés

    // ✅ Typage correct + tri
    const scanKeys = allKeys
      .filter((k: string) => k.startsWith('scan_')) // ✅ 'k' maintenant typé en 'string'
      .sort()
      .reverse();

    if (scanKeys.length > 0) {
      const lastKey = scanKeys[0];
      const item = await Storage.get({ key: lastKey });

      if (item.value) {
        const data = JSON.parse(item.value);
        setPrediction({
          plant: data.plant,
          disease: data.disease,
          status: data.status,
          confidence: data.confidence,
        });
        setImage(data.image);
      }
    }
  };

  if (!prediction || !image) {
    return (
      <IonPage>
        <IonContent className="ion-padding text-center">
          <p>Aucun résultat trouvé.</p>
          <IonButton expand="block" color="success" onClick={() => history.push('/scanner')}>
            Revenir au scanner
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButton slot="start" fill="clear" onClick={() => history.push('/scanner')}>
            ← Retour
          </IonButton>
          <IonTitle>Résultat</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        {/* Aperçu de la photo */}
        <IonCard className="w-full max-w-md shadow-xl rounded-3xl overflow-hidden bg-white dark:bg-gray-800 mb-6 mx-auto">
          <IonImg src={image} alt="Photo analysée" className="h-64 w-full object-cover" />
          <IonCardContent className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{prediction.plant}</h2>
            <p className={`text-lg ${prediction.status === 'SAIN' ? 'text-green-600' : 'text-red-600'} font-medium`}>
              {prediction.status}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Confiance : {prediction.confidence}</p>
          </IonCardContent>
        </IonCard>

        {/* Diagnostique */}
        <IonCard className="w-full max-w-md shadow-md rounded-xl bg-white dark:bg-gray-800 mb-6 mx-auto">
          <IonCardContent className="p-4">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Diagnostic</h3>
            <p className="text-gray-700 dark:text-gray-300">{prediction.disease}</p>
          </IonCardContent>
        </IonCard>

        {/* Bouton sauvegarder + retour */}
        <div className="px-4">
          <IonButton expand="block" color="success" onClick={() => saveToHistory(prediction, image)}>
            Sauvegarder
          </IonButton>
          <IonButton expand="block" fill="clear" color="medium" onClick={() => history.push('/tabs/historique')}>
            Voir l’historique
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ResultPage;