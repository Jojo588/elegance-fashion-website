'use client';

import { useState, useEffect } from 'react';
import { storage, auth, db } from '@/lib/firebase';
import { ref, uploadBytes, listAll } from 'firebase/storage';
import { getDocs, collection } from 'firebase/firestore';

export default function FirebaseTestPage() {
  const [status, setStatus] = useState<Record<string, string>>({});
  const [testing, setTesting] = useState(false);

  const runTests = async () => {
    setTesting(true);
    const results: Record<string, string> = {};

    // Test 1: Check storage object
    results.storage = storage ? '✅ Storage initialized' : '❌ Storage is null/undefined';
    console.log('[v0] Test 1 - Storage:', results.storage);

    // Test 2: Check auth object
    results.auth = auth ? '✅ Auth initialized' : '❌ Auth is null/undefined';
    console.log('[v0] Test 2 - Auth:', results.auth);

    // Test 3: Check database object
    results.database = db ? '✅ Database initialized' : '❌ Database is null/undefined';
    console.log('[v0] Test 3 - Database:', results.database);

    // Test 4: Try to create a storage reference
    try {
      const testRef = ref(storage, 'test/test.txt');
      results.storageRef = '✅ Can create storage reference';
      console.log('[v0] Test 4 - Storage ref:', results.storageRef);
    } catch (err: any) {
      results.storageRef = `❌ Cannot create storage ref: ${err.message}`;
      console.error('[v0] Test 4 - Error:', err);
    }

    // Test 5: Try to list storage files
    try {
      const listRef = ref(storage, 'products');
      const res = await listAll(listRef);
      results.storageListing = `✅ Can list storage (${res.items.length} items)`;
      console.log('[v0] Test 5 - Storage listing:', results.storageListing);
    } catch (err: any) {
      results.storageListing = `❌ Cannot list storage: ${err.code} - ${err.message}`;
      console.error('[v0] Test 5 - Error:', err);
    }

    // Test 6: Try to query Firestore
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      results.firestore = `✅ Can read Firestore (${querySnapshot.size} products)`;
      console.log('[v0] Test 6 - Firestore:', results.firestore);
    } catch (err: any) {
      results.firestore = `❌ Cannot read Firestore: ${err.code} - ${err.message}`;
      console.error('[v0] Test 6 - Error:', err);
    }

    setStatus(results);
    setTesting(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="min-h-screen bg-muted p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Firebase Connectivity Test</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          {Object.entries(status).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 border-b">
              <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
              <span className={value.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                {value}
              </span>
            </div>
          ))}

          <button
            onClick={runTests}
            disabled={testing}
            className="w-full mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {testing ? 'Testing...' : 'Run Tests Again'}
          </button>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Next Steps:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>If Storage shows ❌, check your Firebase environment variables</li>
              <li>If Storage shows ❌ with "permission-denied", update Firebase Storage Rules</li>
              <li>If Firestore shows ❌ with "permission-denied", update Firestore Rules</li>
              <li>Check browser console (F12) for detailed error messages with [v0] prefix</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
