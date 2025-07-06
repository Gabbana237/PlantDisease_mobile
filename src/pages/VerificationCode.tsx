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
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { lockOpenOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'; // ⬅️ Import pour accéder à l'email via l'URL

const VerificationCode: React.FC = () => {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const location = useLocation(); // ⬅️ Accès aux paramètres de l'URL
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email') || 'votre adresse email'; // ⬅️ Récupération de l'email

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Focus automatique sur le champ suivant
      if (value && index < 5) {
        const next = document.getElementById(`code-input-${index + 1}`);
        if (next) next.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const codeString = code.join('');
      if (codeString.length === 6 && /^\d+$/.test(codeString)) {
        setSuccessMsg("Code vérifié avec succès !");
        // Rediriger ou continuer ici
      } else {
        setErrorMsg("Le code doit contenir 6 chiffres.");
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
              Saisissez le code de vérification
            </p>
          </div>

          {/* Formulaire */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="text-center mb-6">
              <IonIcon
                icon={lockOpenOutline}
                className="text-4xl text-emerald-600 mx-auto mb-3"
              />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Code de vérification
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Un code à 6 chiffres vous a été envoyé par email à{' '}
                <span className="font-medium text-yellow-600 dark:text-yellow-400">
                  {email}
                </span>.
              </p>
            </div>

            {/* Champs de saisie */}
            <IonGrid className="mb-6">
              <IonRow className="justify-center space-x-2">
                {code.map((digit, index) => (
                  <IonCol size="auto" key={index}>
                    <div className="relative">
                      <input
                        id={`code-input-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleInputChange(e, index)}
                        className="w-12 h-14 md:w-16 md:h-16 border-2 border-yellow-400 rounded-lg text-center text-xl font-bold text-black dark:text-white dark:bg-gray-700 outline-none focus:border-yellow-500 transition-colors duration-200"
                      />
                    </div>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>

            {/* Messages */}
            {errorMsg && (
              <IonNote color="danger" className="block text-center mb-4 p-2 bg-red-50 dark:bg-red-900 rounded-lg">
                {errorMsg}
              </IonNote>
            )}

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
                  Valider le code
                  <IonIcon slot="end" icon={checkmarkCircleOutline} />
                </>
              )}
            </IonButton>
          </form>

          {/* Lien retour */}
          <div className="mt-6 text-center text-sm w-full max-w-md">
            <p className="text-gray-600 dark:text-gray-400">
              Vous n'avez pas reçu de code ?{' '}
              <a
                href="#"
                className="text-yellow-500 hover:text-yellow-600 transition-colors duration-200"
              >
                Renvoyer le code
              </a>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VerificationCode;