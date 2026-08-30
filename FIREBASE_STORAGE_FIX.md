# Firebase Storage Image Upload - Troubleshooting & Fix Guide

## The Problem
When you try to upload a product image in the admin panel, the form gets stuck at "25% - Uploading image..." and never completes.

## Root Causes

### Cause 1: Firebase Storage Rules Block Uploads
**Most Common Issue** - Firebase Storage has default security rules that block all uploads from unauthenticated users or require specific permissions.

### Cause 2: Missing Firebase Environment Variables
Firebase isn't initialized because env vars aren't set in your Vercel project.

### Cause 3: Unauthenticated User
The admin user isn't properly authenticated with Firebase Auth.

---

## How to Diagnose

### Step 1: Run the Firebase Test Page
Navigate to: `https://your-site.com/firebase-test`

This page will show you:
- ✅ Storage initialized
- ✅ Auth initialized  
- ✅ Database initialized
- ✅ Can create storage reference
- ✅ Can list storage files
- ✅ Can read Firestore

If any show ❌, that's your issue.

### Step 2: Open Browser Console (F12)
Look for messages with `[v0]` prefix:
```
[v0] ===== IMAGE UPLOAD START =====
[v0] File name: dress.jpg
[v0] Storage object: object defined
[v0] Step 1: Creating storage reference...
[v0] Step 2: Storage ref created successfully
[v0] Step 3: Starting uploadBytes...
```

If it stops after "Step 3", your Firebase Storage Rules are blocking it.

---

## The Fix

### Fix 1: Update Firebase Storage Security Rules

1. Go to **Firebase Console** → Select your project
2. Click **Storage** in the left menu
3. Click the **Rules** tab
4. Replace the rules with this:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow anyone to read product images
    match /products/{allPaths=**} {
      allow read;
      allow write: if request.auth != null;
    }
    
    // Allow reads and writes for all files if authenticated
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

5. Click **Publish**

### Fix 2: Make Sure Admin User is Authenticated

1. Go to `/admin/login`
2. Log in with your Firebase credentials
3. If you haven't created an admin user yet:
   - Go to **Firebase Console** → **Authentication** → **Users** tab
   - Click **Add User**
   - Enter email and password
   - Click **Create User**

### Fix 3: Verify Firebase Environment Variables

Make sure these are set in your Vercel project (Settings → Vars):
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` ← Most important for uploads
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

All must have values (not "MISSING").

---

## What Happens When You Upload

1. **Admin selects image file** → Progress: 0%
2. **Form validates** → Form checks product name, price, etc.
3. **Image uploads to Firebase Storage** → Progress: 25-75%
   - File is sent to `gs://your-bucket.appspot.com/products/[timestamp]-filename.jpg`
   - Firebase Storage Rules checked - must allow write
4. **Get download URL** → Progress: 75-90%
   - Firebase returns public URL for the image
5. **Save product to Firestore** → Progress: 90-100%
   - Product data + image URL saved to database
6. **Success** → Form closes, product appears in table

---

## Debug Console Output

### Success Output
```
[v0] ===== IMAGE UPLOAD START =====
[v0] Step 1: Creating storage reference...
[v0] Step 2: Storage ref created successfully
[v0] Step 3: Starting uploadBytes...
[v0] Step 4: Awaiting upload...
[v0] Step 5: Upload completed successfully
[v0] Step 6: Getting download URL...
[v0] Step 7: Download URL obtained: https://firebasestorage.googleapis.com/v0/b/...
[v0] ===== IMAGE UPLOAD SUCCESS =====
```

### Failed Output (Permission Denied)
```
[v0] ===== IMAGE UPLOAD START =====
[v0] Step 1: Creating storage reference...
[v0] Step 2: Storage ref created successfully
[v0] Step 3: Starting uploadBytes...
[v0] ===== IMAGE UPLOAD FAILED =====
[v0] Error code: storage/unauthorized
[v0] Error message: Firebase Storage: User does not have permission to access 'products/...'
```

**Solution**: Update Firebase Storage Rules (Fix 1 above)

### Failed Output (Storage Not Initialized)
```
[v0] Storage object: undefined
[v0] ===== IMAGE UPLOAD FAILED =====
[v0] Error code: undefined
[v0] Error message: Firebase Storage is not initialized
```

**Solution**: Check Firebase environment variables (Fix 3 above)

---

## Quick Checklist

- [ ] Firebase environment variables are set in Vercel
- [ ] Admin user created in Firebase Authentication
- [ ] Admin user is logged in at `/admin/login`
- [ ] Firebase Storage Rules updated to allow authenticated uploads
- [ ] Browser console shows no errors (or errors with [v0] prefix)
- [ ] Firebase Test page shows all ✅ checkmarks
- [ ] Try uploading a small image file (< 5MB)

---

## Still Not Working?

1. Check the Firebase Console for error logs
2. Verify the storage bucket name in your Firestore config
3. Make sure your Firebase project has Storage enabled
4. Try clearing browser cache (Ctrl+Shift+Delete)
5. Try from an incognito window
6. Check if your ISP/network blocks Firebase
