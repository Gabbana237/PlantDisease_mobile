import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
} from '@ionic/react';
import { informationCircleOutline, constructOutline, flowerOutline, leafOutline } from 'ionicons/icons';

const About: React.FC = () => {
  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>À propos</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Contenu */}
      <IonContent fullscreen className="ion-padding bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center mb-6">
          {/* Logo ou icône */}
          <IonIcon
            icon={leafOutline}
            className="text-10xl text-emerald-600 mb-4"
          />
          <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400">
            La Clinique Des Plantes
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Version 1.0.0</p>
        </div>

        {/* Description */}
        <IonCard className="mb-4 shadow-md rounded-xl overflow-hidden">
          <IonCardContent>
            <h2 className="font-semibold text-gray-800 dark:text-white mb-2">Description</h2>
            <p className="text-gray-600 dark:text-gray-300">
              L'appli <strong>La Clinique Des Plantes</strong> vous permet de scanner vos plantes en temps réel pour détecter d'éventuelles maladies grâce à l'intelligence artificielle.
              Consultez votre historique, obtenez des conseils de soins et partagez vos diagnostics avec des experts.
            </p>
          </IonCardContent>
        </IonCard>

        {/* Fonctionnalités */}
        <IonCard className="mb-4 shadow-md rounded-xl overflow-hidden">
          <IonCardContent>
            <h2 className="font-semibold text-gray-800 dark:text-white mb-2">Fonctionnalités</h2>
            <IonList lines="none">
              <IonItem className="mb-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <IonIcon slot="start" icon={flowerOutline} className="text-emerald-600 mr-2" />
                <IonLabel>
                  <h3 className="font-medium text-gray-800 dark:text-white">Scanner une plante</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Prenez une photo ou une vidéo et laissez notre IA faire le diagnostic.
                  </p>
                </IonLabel>
              </IonItem>

              <IonItem className="mb-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <IonIcon slot="start" icon={constructOutline} className="text-emerald-600 mr-2" />
                <IonLabel>
                  <h3 className="font-medium text-gray-800 dark:text-white">Réglages personnalisables</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Langue, mode sombre, notifications, etc.
                  </p>
                </IonLabel>
              </IonItem>

              <IonItem className="rounded-lg bg-gray-50 dark:bg-gray-800">
                <IonIcon slot="start" icon={informationCircleOutline} className="text-emerald-600 mr-2" />
                <IonLabel>
                  <h3 className="font-medium text-gray-800 dark:text-white">Historique des analyses</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Retrouvez toutes vos analyses passées avec les résultats et niveau de confiance.
                  </p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Crédits */}
        <IonCard className="mb-4 shadow-md rounded-xl overflow-hidden">
          <IonCardContent>
            <h2 className="font-semibold text-gray-800 dark:text-white mb-2">Crédits</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Développé par <strong>Votre Nom / Votre Entreprise</strong><br />
              © 2025 - Tous droits réservés
            </p>
          </IonCardContent>
        </IonCard>

        {/* Version */}
        <IonCard className="shadow-md rounded-xl overflow-hidden">
          <IonCardContent className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Version : <span className="font-mono">1.0.0</span>
            </p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default About;