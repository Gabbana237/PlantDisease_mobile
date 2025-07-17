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
  IonToast,
  IonSpinner,
} from '@ionic/react';
import { cameraOutline, videocamOutline, closeCircle } from 'ionicons/icons';
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const Scanner: React.FC = () => {
  const history = useHistory();

  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limiter la taille à 10 Mo
    if (file.size > 10 * 1024 * 1024) {
      setToastMessage('Fichier trop volumineux (max 10 Mo)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedMedia(event.target?.result as string);
      setToastMessage('Fichier sélectionné avec succès !');
    };
    reader.readAsDataURL(file);
  };

  const triggerCamera = () => {
    fileInputRef.current?.click();
  };

  const resetSelection = () => {
    setSelectedMedia(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const sendToAPI = async () => {
    if (!fileInputRef.current?.files?.length) {
      setToastMessage("Aucun fichier sélectionné");
      return;
    }

    setLoading(true);

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://10.197.89.8:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      console.log("Réponse reçue :", data); // 🔍 Debug

      if (data && data.plant && data.status) {
        console.log("Navigation en cours..."); // ✅
        history.push('/result', {
          prediction: data,
          image: selectedMedia,
        });
      } else {
        throw new Error("Données incomplètes depuis l'API");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      setToastMessage("Échec de la prédiction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Scanner une plante</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col items-center justify-center h-full text-center px-4 pt-6 pb-20">

          {/* Carte principale */}
          <IonCard className="w-full max-w-md shadow-xl rounded-3xl bg-white dark:bg-gray-800 transition-all duration-300 transform hover:scale-[1.01]">
            <IonCardContent className="p-6">

              {/* Icône principale */}
              <div className="flex justify-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900 p-4 rounded-full">
                  <IonIcon icon={videocamOutline} className="text-5xl text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Filmez votre plante</h2>
              <p className="text-gray-500 dark:text-gray-300 mb-6">
                Prenez une photo ou vidéo claire de la plante malade. Notre système détectera sa maladie.
              </p>

              {/* Bouton principal */}
              {!selectedMedia ? (
                <IonButton expand="block" onClick={triggerCamera} color="success" className="animate-pulse">
                  <IonIcon slot="start" icon={cameraOutline} />
                  Prendre une photo / vidéo
                </IonButton>
              ) : (
                <IonButton expand="block" onClick={sendToAPI} color="primary" disabled={loading}>
                  {loading ? <IonSpinner name="dots" /> : "Analyser"}
                </IonButton>
              )}

              {/* Input caché */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              {/* Aperçu de l'image */}
              {selectedMedia && (
                <div className="mt-6 relative">
                  <img src={selectedMedia} alt="Aperçu" className="w-full max-h-64 object-cover rounded-xl shadow-md" />
                  <button
                    onClick={resetSelection}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                  >
                    <IonIcon icon={closeCircle} />
                  </button>
                </div>
              )}
            </IonCardContent>
          </IonCard>

          {/* Info supplémentaire */}
          <p className="text-sm text-gray-400 mt-6">Vos données restent privées et sécurisées.</p>
        </div>

        {/* Toast */}
        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setToastMessage('')}
          position="bottom"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Scanner;