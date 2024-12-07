import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// https://firebase.google.com/docs/web/setup#available-libraries

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'test_api_key',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'test_auth_domain',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'test_project_id',
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'test_storage_bucket',
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ||
    'test_messaging_sender_id',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || 'test_app_id',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export default app
