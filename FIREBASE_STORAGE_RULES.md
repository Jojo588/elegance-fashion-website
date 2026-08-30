# Firebase Storage Security Rules - Step by Step

## Why Image Uploads Are Blocked

By default, Firebase Storage denies all write operations. You need to update the Security Rules to allow your app to upload images.

## Step-by-Step Fix

### 1. Open Firebase Console
- Go to: https://console.firebase.google.com
- Select your project from the list

### 2. Navigate to Storage Rules
- Click **Storage** in the left sidebar
- Click the **Rules** tab at the top

### 3. Copy and Paste These Rules

Replace all content in the Rules editor with:

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

### 4. Click Publish

You'll see a warning dialog. Click **Publish** to confirm.

### 5. Wait for Rules to Deploy

The rules should deploy within 1-2 minutes. You'll see a checkmark when complete.

---

## What These Rules Do

| Rule | What It Does |
|------|-------------|
| `allow read;` under products | Anyone can view/download product images |
| `allow write: if request.auth != null;` | Only authenticated users can upload to products folder |
| `allow read: if true;` | Anyone can read all files |
| `allow write: if request.auth != null;` | Only authenticated users can write all files |

---

## Test the Upload Again

1. Go to your Elegance Fashion admin panel: `/admin/dashboard/products`
2. Make sure you're logged in at `/admin/login`
3. Click "Add Product"
4. Select an image file
5. Fill in product details
6. Click "Add Product"

The upload should now work. You'll see:
- Progress bar: 25% → 75% → 90% → 100%
- Success message: "Product added successfully!"
- Product appears in the admin table

---

## If Still Getting Errors

### Error: "User does not have permission"
- Make sure Firebase Storage Rules are published (not just edited)
- Wait 2 minutes for changes to propagate
- Clear browser cache and try again

### Error: "Storage bucket not found"
- Verify `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` is set correctly in Vercel
- Should look like: `your-project.appspot.com`
- Check it matches your Firebase Console Storage bucket name

### Error: "User is not authenticated"
- Make sure admin user is logged in at `/admin/login`
- Create an admin user in Firebase Authentication if needed

---

## More Restrictive Rules (Optional)

If you want to be more restrictive, only allow uploads to authenticated admin users:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read;
      allow write: if request.auth != null && isAdmin(request.auth.uid);
    }
  }
  
  function isAdmin(uid) {
    return firestore.get(/databases/(default)/documents/admins/{uid}).data.isAdmin == true;
  }
}
```

This requires an `admins` collection in Firestore, so the simpler rules above are recommended for now.
