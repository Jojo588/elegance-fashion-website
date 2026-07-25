# Elegance Fashion Admin Portal - Setup & Troubleshooting Guide

## Quick Start

### 1. Log In
- Go to `/admin/login`
- Enter your Firebase email and password
- You'll be redirected to the admin dashboard

### 2. Add Your First Product
- Click "Add Product" button
- Fill in: Name, Price, Description, Category, Sizes, Colors
- **Image is optional** - if you don't upload an image, a placeholder will be used
- Click "Add Product"
- Product will appear in your products list

### 3. View Products on Frontend
- Products appear immediately on the homepage
- They're searchable and filterable
- Customers can order via WhatsApp

## Firebase Configuration

### Required Environment Variables
Your Vercel project must have these set:
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

### Check Configuration
1. Go to `/admin/dashboard/diagnostic`
2. See if all three items show ✓ (checkmarks)
3. If Storage shows ✗, your environment variables aren't set

### To Set Environment Variables in Vercel
1. Go to your Vercel project
2. Settings → Environment Variables
3. Add each NEXT_PUBLIC_FIREBASE_* variable
4. Redeploy your project

## Product Management

### Add Product
- Click "Add Product"
- Fill form with product details
- Image upload is optional (uses placeholder if skipped)
- Can add image later by editing product

### Edit Product
- Click edit (pencil icon) on any product
- Update details
- Can change or add image
- Click "Update Product"

### Delete Product
- Click delete (trash icon) on any product
- Confirm deletion
- Product removed immediately

## Image Upload Issues

### If Images Won't Upload
1. Check Firebase Storage is configured in Vercel
2. Check environment variables are set
3. Try adding product without image first
4. Edit product later to add image

### To Upload Images to Firebase Storage
1. Edit an existing product
2. Select a new image file
3. Progress bar shows upload status
4. Wait for "Product updated successfully" message

## Troubleshooting

### Products Not Appearing
- Check if product was actually saved (look in products table)
- Refresh the page
- Check browser console for errors (F12)

### Upload Stuck at 25%
- This means Firebase Storage upload is failing
- Check environment variables in Vercel settings
- Try adding product without image first

### Can't Log In
- Firebase Authentication not set up
- Check admin account exists in Firebase Console
- Go to Firebase Console → Authentication → Users
- Create admin account with email/password if needed

### Forms Stuck or Not Submitting
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)
- Try a different browser
- Check internet connection

## Firebase Collections Structure

### Products Collection
```
products/
├── [productId]
│   ├── name: string
│   ├── price: number
│   ├── image: string (URL)
│   ├── description: string
│   ├── category: string
│   ├── sizes: ["S", "M", "L", ...]
│   ├── colors: ["Pink", "White", ...]
│   ├── isFeatured: boolean
│   ├── isNew: boolean
│   ├── isBestSeller: boolean
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp
```

### Orders Collection
```
orders/
├── [orderId]
│   ├── productId: string
│   ├── productName: string
│   ├── size: string
│   ├── color: string
│   ├── quantity: number
│   ├── price: number
│   ├── totalPrice: number
│   ├── customerName: string (optional)
│   ├── customerLocation: string (optional)
│   ├── status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
│   └── createdAt: timestamp
```

## Debugging with Console Logs

Open browser developer tools (F12) and look for logs starting with `[v0]`:

- `[v0] Form submission started` - Form began processing
- `[v0] Uploading image to Firebase Storage` - Image upload started
- `[v0] Image uploaded successfully` - Image saved to Firebase
- `[v0] Adding new product` - Saving to Firestore
- `[v0] Product added successfully with ID` - Complete success

If you see error messages, they'll show what went wrong.

## Admin Dashboard Features

- **Dashboard**: Overview of products, orders, stats
- **Products**: Manage product catalog
- **Orders**: Track customer orders and update status
- **Settings**: Configure store info and WhatsApp number
- **Logout**: Sign out of admin portal

## Support

If products still won't save after checking everything:
1. Verify all Firebase env variables in Vercel
2. Check Firebase Console for any errors
3. Try adding a simple product with just name and price
4. Check browser console (F12) for error messages
