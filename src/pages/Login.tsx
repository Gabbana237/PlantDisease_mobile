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
  IonList,
  useIonRouter,
} from '@ionic/react';
import { mailOutline, lockClosedOutline, logInOutline } from 'ionicons/icons';
import { useState } from 'react';
import apiService from '../services/apiService';

const Login: React.FC = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useIonRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      // ➜ POST /login (ou /auth/login) sur ton API Laravel
      const { access_token, user } = await apiService.login(email, password);

      // Stocke le jeton (et l’utilisateur, si tu veux le garder localement)
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirige vers une page protégée
      router.push('/dashboard', 'root');
    } catch (err: any) {
      /**
       * Structure d’erreur côté Laravel :
       *   - 422 : { errors: { email: ['…'], password: ['…'] } }
       *   - 401 : { message: 'Invalid credentials' }
       */
      if (err?.errors) {
        const firstField = Object.values<string[]>(err.errors)[0];
        setErrorMsg(firstField[0]);
      } else if (err?.message) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Une erreur est survenue. Veuillez réessayer.');
      }
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
              Connectez-vous pour accéder à vos diagnostics
            </p>
          </div>

          {/* Formulaire */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <IonList lines="none" className="dark:bg-gray-800">
              {/* Email */}
              <IonItem className="rounded-lg mb-4 bg-gray-50 dark:bg-gray-700">
                <IonIcon slot="start" icon={mailOutline} className="text-emerald-600" />
                <IonLabel position="floating" className="text-gray-700 dark:text-gray-300">
                  Adresse Email
                </IonLabel>
                <IonInput
                  required
                  type="email"
                  value={email}
                  onIonInput={(e) => setEmail(e.detail.value!)}
                  className="text-black dark:text-white"
                />
              </IonItem>

              {/* Mot de passe */}
              <IonItem className="rounded-lg mb-6 bg-gray-50 dark:bg-gray-700">
                <IonIcon slot="start" icon={lockClosedOutline} className="text-emerald-600" />
                <IonLabel position="floating" className="text-gray-700 dark:text-gray-300">
                  Mot de passe
                </IonLabel>
                <IonInput
                  required
                  type="password"
                  value={password}
                  onIonInput={(e) => setPassword(e.detail.value!)}
                  className="text-black dark:text-white"
                />
              </IonItem>
            </IonList>

            {/* Message d'erreur */}
            {errorMsg && (
              <IonNote
                color="danger"
                className="block text-center mb-4 p-2 bg-red-50 dark:bg-red-900 rounded-lg"
              >
                {errorMsg}
              </IonNote>
            )}

            {/* Bouton de soumission */}
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
                  Se connecter
                  <IonIcon slot="end" icon={logInOutline} />
                </>
              )}
            </IonButton>
          </form>

          {/* Liens supplémentaires */}
          <div className="mt-6 text-center text-sm w-full max-w-md">
            <a
              href="/forgot-password"
              className="text-yellow-500 hover:text-yellow-600 transition-colors duration-200"
            >
              Mot de passe oublié ?
            </a>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Pas encore inscrit ?{' '}
              <a
                href="/register"
                className="text-yellow-500 hover:text-yellow-600 transition-colors duration-200"
              >
                Créer un compte
              </a>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
