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
  try {
    console.log('[v0] Firebase config is valid, initializing...');
    if (getApps().length === 0) {
      console.log('[v0] Creating new Firebase app');
      app = initializeApp(firebaseConfig);
    } else {
      console.log('[v0] Using existing Firebase app');
      app = getApps()[0];
    }
    
    console.log('[v0] Initializing Auth...');
    auth = getAuth(app);
    console.log('[v0] Auth initialized:', !!auth);
    
    console.log('[v0] Initializing Firestore...');
    db = getFirestore(app);
    console.log('[v0] Firestore initialized:', !!db);
    
    console.log('[v0] Initializing Storage...');
    storage = getStorage(app);
    console.log('[v0] Storage initialized:', !!storage);
    console.log('[v0] Storage bucket:', firebaseConfig.storageBucket);
  } catch (error: any) {
    console.error('[v0] Firebase initialization error:', error.message);
    console.error('[v0] Full error:', error);
  }
} else {
  console.error('[v0] FIREBASE NOT CONFIGURED - Missing env vars:');
  Object.entries(firebaseConfig).forEach(([key, value]) => {
    if (value === 'MISSING') {
      console.error('[v0]   -', key);
    }
  });
}

export { auth, db, storage };
export default app;
