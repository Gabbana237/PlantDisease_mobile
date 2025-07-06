import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonThumbnail,
  IonImg,
} from '@ionic/react';

const Historique: React.FC = () => {
  const analyses = [
    {
      id: 1,
      date: '2025-04-01',
      resultat: 'Oïdium',
      confidence: 92,
      image: 'https://picsum.photos/id/1018/300/200 ', // Image exemple
    },
    {
      id: 2,
      date: '2025-03-29',
      resultat: 'Mildiou',
      confidence: 76,
      image: 'https://picsum.photos/id/1012/300/200 ',
    },
    {
      id: 3,
      date: '2025-03-25',
      resultat: 'Rouille',
      confidence: 85,
      image: 'https://picsum.photos/id/1019/300/200 ',
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Historique</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding bg-white dark:bg-gray-900">
        <h2 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">
          Analyses précédentes
        </h2>

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
      </IonContent>
    </IonPage>
  );
};

export default Historique;