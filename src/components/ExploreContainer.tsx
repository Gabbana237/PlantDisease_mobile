// src/components/LoginForm.tsx
import { useState } from 'react';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonSpinner,
} from '@ionic/react';
import { logInOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    setLoading(true);
    setError('');

    try {
      // ⇣ Appelle ton API Laravel ici
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message ?? 'Identifiants invalides');
      }

      // TODO : stocker le token, passer à l’écran suivant, etc.
      console.log('Connexion réussie');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-xl bg-white shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        Connexion
      </h2>

      <IonItem className="mb-4 rounded-lg bg-gray-50 dark:bg-gray-700">
        <IonIcon slot="start" icon={mailOutline} />
        <IonLabel position="floating">Email</IonLabel>
        <IonInput
          type="email"
          value={email}
          onIonInput={(e) => setEmail(e.detail.value!)}
          required
        />
      </IonItem>

      <IonItem className="mb-4 rounded-lg bg-gray-50 dark:bg-gray-700">
        <IonIcon slot="start" icon={lockClosedOutline} />
        <IonLabel position="floating">Mot de passe</IonLabel>
        <IonInput
          type="password"
          value={password}
          onIonInput={(e) => setPassword(e.detail.value!)}
          required
        />
      </IonItem>

      {error && (
        <IonNote color="danger" className="block mb-4 text-center">
          {error}
        </IonNote>
      )}

      <IonButton
        expand="block"
        className="mt-2"
        onClick={submit}
        disabled={loading}
      >
        {loading ? <IonSpinner name="dots" /> : 'Se connecter'}
        {!loading && <IonIcon slot="end" icon={logInOutline} />}
      </IonButton>
    </div>
  );
};

export default LoginForm;
