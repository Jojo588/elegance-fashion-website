import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Query,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from './firebase';

// Product Type
export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  images?: string[];
  sizes: string[];
  colors: string[];
  category: string;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  createdAt: number;
  updatedAt: number;
}

// Order Type
export interface Order {
  id?: string;
  productId: string;
  productName: string;
  productImage: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  totalPrice: number;
  customerName?: string;
  customerLocation?: string;
  phoneNumber?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  whatsappSent: boolean;
  createdAt: number;
}

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

// Get product by ID
export const getProductById = async (productId: string): Promise<Product | null> => {
  const docRef = doc(db, 'products', productId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Product;
  }
  return null;
};

// Get featured products
export const getFeaturedProducts = async (limitCount = 6): Promise<Product[]> => {
  const constraints: QueryConstraint[] = [
    where('isFeatured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(limitCount),
  ];
  const q = query(collection(db, 'products'), ...constraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

// Get new arrivals
export const getNewArrivals = async (limitCount = 6): Promise<Product[]> => {
  const constraints: QueryConstraint[] = [
    where('isNew', '==', true),
    orderBy('createdAt', 'desc'),
    limit(limitCount),
  ];
  const q = query(collection(db, 'products'), ...constraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

// Get best sellers
export const getBestSellers = async (limitCount = 6): Promise<Product[]> => {
  const constraints: QueryConstraint[] = [
    where('isBestSeller', '==', true),
    orderBy('createdAt', 'desc'),
    limit(limitCount),
  ];
  const q = query(collection(db, 'products'), ...constraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

// Add product
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  try {
    console.log('[v0] Adding product to Firebase:', product.name);
    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    console.log('[v0] Product saved successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('[v0] Error adding product:', error);
    throw error;
  }
};

// Update product
export const updateProduct = async (productId: string, product: Partial<Product>): Promise<void> => {
  try {
    console.log('[v0] Updating product:', productId);
    const docRef = doc(db, 'products', productId);
    await updateDoc(docRef, {
      ...product,
      updatedAt: Date.now(),
    });
    console.log('[v0] Product updated successfully:', productId);
  } catch (error) {
    console.error('[v0] Error updating product:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    console.log('[v0] Deleting product:', productId);
    await deleteDoc(doc(db, 'products', productId));
    console.log('[v0] Product deleted successfully:', productId);
  } catch (error) {
    console.error('[v0] Error deleting product:', error);
    throw error;
  }
};

// Add order
export const addOrder = async (order: Omit<Order, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'orders'), {
    ...order,
    createdAt: Date.now(),
  });
  return docRef.id;
};

// Get all orders
export const getAllOrders = async (): Promise<Order[]> => {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
  const q = query(collection(db, 'orders'), ...constraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
};

// Update order status
export const updateOrderStatus = async (
  orderId: string,
  status: Order['status']
): Promise<void> => {
  const docRef = doc(db, 'orders', orderId);
  await updateDoc(docRef, { status });
};
