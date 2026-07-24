import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'MISSING',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'MISSING',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'MISSING',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'MISSING',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'MISSING',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'MISSING',
};

// Check if Firebase is properly configured
const isFirebaseConfigured = !Object.values(firebaseConfig).includes('MISSING');

let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;

// Only initialize Firebase if all environment variables are present
if (isFirebaseConfigured) {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} else {
  // Create dummy objects for build time
  if (typeof window === 'undefined') {
    // Server-side: create placeholder objects
    auth = {};
    db = {};
    storage = {};
    app = {};
  }
}

export { auth, db, storage };
export default app;
