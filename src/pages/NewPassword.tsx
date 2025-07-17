import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonNote,
  IonSpinner,
  IonIcon,
} from '@ionic/react';
import { lockClosedOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'; // ⬅️ Import pour lire l'email

const NewPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const location = useLocation(); // ⬅️ Accès aux paramètres de l'URL
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email') || 'votre adresse email'; // ⬅️ Récupération de l'email

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!password || !confirmPassword) {
        setErrorMsg("Veuillez remplir tous les champs.");
      } else if (password !== confirmPassword) {
        setErrorMsg("Les mots de passe ne correspondent pas.");
      } else if (password.length < 6) {
        setErrorMsg("Le mot de passe doit contenir au moins 6 caractères.");
      } else {
        setSuccessMsg("Mot de passe mis à jour avec succès !");
        // Redirection vers /login ou autre
      }
    } catch (err) {
      setErrorMsg("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex flex-col justify-center items-center h-full px-4 bg-white dark:bg-gray-900">
          {/* Logo / titre */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800 dark:text-emerald-400">
              La Clinique Des Plantes
            </h1>
            <p className="text-sm text-emerald-600 dark:text-emerald-300 mt-1">
              Réinitialisez votre mot de passe
            </p>
          </div>

          {/* Formulaire */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="text-center mb-6">
              <IonIcon
                icon={lockClosedOutline}
                className="text-4xl text-emerald-600 mx-auto mb-3"
              />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Nouveau mot de passe
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Entrez votre nouveau mot de passe pour{' '}
                <span className="font-medium text-yellow-600 dark:text-yellow-400">
                  {email}
                </span>.
              </p>
            </div>

            {/* Mot de passe */}
            <IonItem className="rounded-lg mb-4 bg-gray-50 dark:bg-gray-700">
              <IonIcon slot="start" icon={lockClosedOutline} className="text-emerald-600" />
              <IonLabel position="floating" className="text-gray-700 dark:text-gray-300">
                Nouveau mot de passe
              </IonLabel>
              <IonInput
                required
                type="password"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value!)}
               
                className="text-black dark:text-white"
              />
            </IonItem>

            {/* Confirmer mot de passe */}
            <IonItem className="rounded-lg mb-6 bg-gray-50 dark:bg-gray-700">
              <IonIcon slot="start" icon={lockClosedOutline} className="text-emerald-600" />
              <IonLabel position="floating" className="text-gray-700 dark:text-gray-300">
                Confirmer le mot de passe
              </IonLabel>
              <IonInput
                required
                type="password"
                value={confirmPassword}
                onIonInput={(e) => setConfirmPassword(e.detail.value!)}
                className="text-black dark:text-white"
              />
            </IonItem>

            {/* Message d'erreur */}
            {errorMsg && (
              <IonNote color="danger" className="block text-center mb-4 p-2 bg-red-50 dark:bg-red-900 rounded-lg">
                {errorMsg}
              </IonNote>
            )}

            {/* Message de succès */}
            {successMsg && (
              <IonNote color="success" className="block text-center mb-4 p-2 bg-green-50 dark:bg-green-900 rounded-lg text-green-700 dark:text-green-200">
                {successMsg}
              </IonNote>
            )}

            {/* Bouton */}
            <IonButton
              expand="block"
              type="submit"
              disabled={loading}
              fill="solid"
              style={{
                '--background': '#FACC15',
                '--background-activated': '#EAB308',
                '--background-focused': '#EAB308',
                '--background-hover': '#EAB308',
                '--color': '#065f46',
                '--border-radius': '8px',
                height: '48px',
                fontSize: '16px',
                fontWeight: '600',
              }}
              className="transition-all duration-200"
            >
              {loading ? (
                <IonSpinner name="dots" className="text-emerald-800" />
              ) : (
                <>
                  Mettre à jour
                  <IonIcon slot="end" icon={checkmarkCircleOutline} />
                </>
              )}
            </IonButton>
          </form>

          {/* Retour connexion */}
          <div className="mt-6 text-center text-sm w-full max-w-md">
            <p className="text-gray-600 dark:text-gray-400">
              Retour à la connexion ?{' '}
              <a
                href="/login"
                className="text-yellow-500 hover:text-yellow-600 transition-colors duration-200"
              >
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NewPassword;