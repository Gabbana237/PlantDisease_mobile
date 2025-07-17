import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonImg,
  IonButton,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Storage } from '@capacitor/storage';

interface Analyse {
  id: string;
  date: string;
  resultat: string;
  confidence: number;
  image: string;
}

const Historique: React.FC = () => {
  const [analyses, setAnalyses] = useState<Analyse[]>([]);
  const history = useHistory();

  // Charger les analyses depuis Capacitor Storage
  const loadHistory = async () => {
    try {
      const result = await Storage.keys(); // ✅ Capacitor retourne un objet avec .keys
      const allKeys = result.keys; // ✅ Extraction du tableau de clés

      const scanKeys = allKeys.filter((key) => key.startsWith('scan_'));

      const items: Analyse[] = [];

      for (const key of scanKeys) {
        const item = await Storage.get({ key });
        if (item.value) {
          const parsed = JSON.parse(item.value);
          items.push({
            id: parsed.id,
            date: new Date(parsed.timestamp).toLocaleDateString(),
            resultat: parsed.disease || 'Inconnu',
            confidence: parseFloat(parsed.confidence.replace('%', '')) || 0,
            image: parsed.image,
          });
        }
      }

      // Trier du plus récent au plus ancien
      const sortedItems = items.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setAnalyses(sortedItems);
    } catch (error) {
      console.error('Erreur lors du chargement de l’historique :', error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Historique</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding bg-white dark:bg-gray-900">
        <h2 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">Analyses précédentes</h2>

        {analyses.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">Aucune analyse enregistrée.</p>
            <IonButton fill="clear" color="success" onClick={() => history.push('/scanner')} className="mt-4">
              Scanner une plante
            </IonButton>
          </div>
        ) : (
          <IonList lines="inset" className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            {analyses.map((analyse) => (
              <IonItem
                key={analyse.id}
                button
                detail
                routerLink={`/historique/${analyse.id}`}
                className="ion-no-padding"
              >
                {/* Image */}
                <IonThumbnail slot="start" className="w-20 h-20 mr-4 rounded-lg overflow-hidden">
                  <IonImg src={analyse.image} alt={`Plante malade - ${analyse.resultat}`} />
                </IonThumbnail>

                {/* Infos */}
                <IonLabel className="ion-text-wrap">
                  <h3 className="font-bold text-emerald-800 dark:text-emerald-400">{analyse.resultat}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{analyse.date}</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Niveau de confiance :</span>
                    <div className="ml-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${analyse.confidence}%`,
                          backgroundColor:
                            analyse.confidence > 90
                              ? '#10B981' // vert
                              : analyse.confidence > 70
                              ? '#F59E0B' // orange
                              : '#EF4444', // rouge
                        }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                      {analyse.confidence}%
                    </span>
                  </div>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Historique;