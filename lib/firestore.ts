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
  try {
    if (!db || typeof db !== 'object' || !db._key) {
      console.log('[v0] Reading products from localStorage fallback');
      const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
      return products as Product[];
    }
    
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.warn('[v0] Error reading from Firestore, using localStorage:', error);
    const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
    return products as Product[];
  }
};

// Get product by ID
export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    if (!db || typeof db !== 'object' || !db._key) {
      console.log('[v0] Reading product from localStorage:', productId);
      const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
      return products.find((p: Product) => p.id === productId) || null;
    }
    
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Product;
    }
    return null;
  } catch (error) {
    console.warn('[v0] Error reading product from Firestore, checking localStorage:', error);
    const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
    return products.find((p: Product) => p.id === productId) || null;
  }
};

// Get featured products
export const getFeaturedProducts = async (limitCount = 6): Promise<Product[]> => {
  try {
    if (!db || typeof db !== 'object' || !db._key) {
      console.log('[v0] Reading featured products from localStorage');
      const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
      return products.filter((p: Product) => p.isFeatured).slice(0, limitCount);
    }
    
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
  } catch (error) {
    console.warn('[v0] Error reading featured products, using localStorage:', error);
    const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
    return products.filter((p: Product) => p.isFeatured).slice(0, limitCount);
  }
};

// Get new arrivals
export const getNewArrivals = async (limitCount = 6): Promise<Product[]> => {
  try {
    if (!db || typeof db !== 'object' || !db._key) {
      console.log('[v0] Reading new arrivals from localStorage');
      const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
      return products.filter((p: Product) => p.isNew).slice(0, limitCount);
    }
    
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
  } catch (error) {
    console.warn('[v0] Error reading new arrivals, using localStorage:', error);
    const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
    return products.filter((p: Product) => p.isNew).slice(0, limitCount);
  }
};

// Get best sellers
export const getBestSellers = async (limitCount = 6): Promise<Product[]> => {
  try {
    if (!db || typeof db !== 'object' || !db._key) {
      console.log('[v0] Reading best sellers from localStorage');
      const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
      return products.filter((p: Product) => p.isBestSeller).slice(0, limitCount);
    }
    
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
  } catch (error) {
    console.warn('[v0] Error reading best sellers, using localStorage:', error);
    const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
    return products.filter((p: Product) => p.isBestSeller).slice(0, limitCount);
  }
};

// Add product
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  try {
    console.log('[v0] Adding product:', product.name);
    
    // Check if Firebase is properly initialized
    if (!db || typeof db !== 'object' || !db._key) {
      console.warn('[v0] Firebase not initialized, using localStorage fallback');
      
      // Use localStorage as fallback
      const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
      const newId = 'product_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      const newProduct = {
        id: newId,
        ...product,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      products.push(newProduct);
      localStorage.setItem('elegance_products', JSON.stringify(products));
      console.log('[v0] Product saved to localStorage with ID:', newId);
      return newId;
    }
    
    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    console.log('[v0] Product saved successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('[v0] Error adding product:', error);
    
    // Fallback to localStorage on any error
    console.log('[v0] Falling back to localStorage due to error');
    const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
    const newId = 'product_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const newProduct = {
      id: newId,
      ...product,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    products.push(newProduct);
    localStorage.setItem('elegance_products', JSON.stringify(products));
    console.log('[v0] Product saved to localStorage fallback with ID:', newId);
    return newId;
  }
};

// Update product
export const updateProduct = async (productId: string, product: Partial<Product>): Promise<void> => {
  try {
    console.log('[v0] Updating product:', productId);
    
    if (!db || typeof db !== 'object' || !db._key) {
      console.log('[v0] Updating product in localStorage');
      const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
      const index = products.findIndex((p: Product) => p.id === productId);
      if (index !== -1) {
        products[index] = {
          ...products[index],
          ...product,
          updatedAt: Date.now(),
        };
        localStorage.setItem('elegance_products', JSON.stringify(products));
        console.log('[v0] Product updated in localStorage:', productId);
      }
      return;
    }
    
    const docRef = doc(db, 'products', productId);
    await updateDoc(docRef, {
      ...product,
      updatedAt: Date.now(),
    });
    console.log('[v0] Product updated successfully:', productId);
  } catch (error) {
    console.error('[v0] Error updating product:', error);
    // Fallback to localStorage
    const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
    const index = products.findIndex((p: Product) => p.id === productId);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        ...product,
        updatedAt: Date.now(),
      };
      localStorage.setItem('elegance_products', JSON.stringify(products));
    }
  }
};

// Delete product
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    console.log('[v0] Deleting product:', productId);
    
    if (!db || typeof db !== 'object' || !db._key) {
      console.log('[v0] Deleting product from localStorage');
      const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
      const filtered = products.filter((p: Product) => p.id !== productId);
      localStorage.setItem('elegance_products', JSON.stringify(filtered));
      console.log('[v0] Product deleted from localStorage:', productId);
      return;
    }
    
    await deleteDoc(doc(db, 'products', productId));
    console.log('[v0] Product deleted successfully:', productId);
  } catch (error) {
    console.error('[v0] Error deleting product:', error);
    // Fallback to localStorage deletion
    const products = JSON.parse(localStorage.getItem('elegance_products') || '[]');
    const filtered = products.filter((p: Product) => p.id !== productId);
    localStorage.setItem('elegance_products', JSON.stringify(filtered));
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
