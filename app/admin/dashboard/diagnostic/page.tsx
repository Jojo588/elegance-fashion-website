'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { auth, db, storage } from '@/lib/firebase';

export default function DiagnosticPage() {
  const [config, setConfig] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setConfig({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.substring(0, 10) + '***',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      appInitialized: !!auth,
      dbInitialized: !!db,
      storageInitialized: !!storage,
      authType: typeof auth,
      dbType: typeof db,
      storageType: typeof storage,
    });
    setLoading(false);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Firebase Configuration Diagnostic</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border border-border">
            <h2 className="font-semibold mb-2">Environment Variables</h2>
            <pre className="bg-muted p-3 rounded text-xs overflow-auto text-foreground">
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border-2 ${config.appInitialized ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <p className="font-semibold text-sm">{config.appInitialized ? '✓' : '✗'} Auth</p>
              <p className="text-xs text-muted-foreground">{config.authType}</p>
            </div>
            <div className={`p-4 rounded-lg border-2 ${config.dbInitialized ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <p className="font-semibold text-sm">{config.dbInitialized ? '✓' : '✗'} Firestore</p>
              <p className="text-xs text-muted-foreground">{config.dbType}</p>
            </div>
            <div className={`p-4 rounded-lg border-2 ${config.storageInitialized ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <p className="font-semibold text-sm">{config.storageInitialized ? '✓' : '✗'} Storage</p>
              <p className="text-xs text-muted-foreground">{config.storageType}</p>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>If Storage shows ✗:</strong> Firebase Storage is not initialized. 
              Check that all NEXT_PUBLIC_FIREBASE_* environment variables are set in Vercel project settings.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
