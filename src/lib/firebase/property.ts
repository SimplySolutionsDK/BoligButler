import { collection, doc, setDoc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from './config';
import { Property } from '../../types/property';
import { deletePropertyImage } from './storage';
import { UserRole, UserData } from '../../types/user';

const getLandlordEmail = async (landlordId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', landlordId));
    if (userDoc.exists()) {
      return userDoc.data().email;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const createProperty = async (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const propertyRef = doc(collection(db, 'properties'));
    const timestamp = new Date();
    const propertyData: Property = {
      ...property,
      id: propertyRef.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await setDoc(propertyRef, propertyData);
    return { property: propertyData, error: null };
  } catch (error) {
    return { property: null, error: error as Error };
  }
};

export const getProperty = async (propertyId: string) => {
  try {
    const propertyDoc = await getDoc(doc(db, 'properties', propertyId));
    if (propertyDoc.exists()) {
      return { property: propertyDoc.data() as Property, error: null };
    }
    return { property: null, error: new Error('Property not found') };
  } catch (error) {
    return { property: null, error: error as Error };
  }
};

export const getProperties = async (userId: string, userRole: UserRole) => {
  try {
    let q;
    
    // Admins can see all properties, landlords only see their own
    if (userRole === 'Admin') {
      q = query(collection(db, 'properties'));
    } else {
      q = query(
        collection(db, 'properties'),
        where('landlordId', '==', userId)
      );
    }
    
    const querySnapshot = await getDocs(q);
    const properties = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const property = doc.data() as Property;
        const landlordEmail = await getLandlordEmail(property.landlordId);
        return { ...property, landlordEmail };
      })
    );
    return { properties, error: null };
  } catch (error) {
    return { properties: [], error: error as Error };
  }
};

export const updateProperty = async (propertyId: string, updates: Partial<Property>, oldImages?: Array<{ url: string; path: string }>) => {
  try {
    // If oldImages is provided and different from new images, delete removed images
    if (oldImages && updates.images) {
      const removedImages = oldImages.filter(oldImage => 
        !updates.images?.some(newImage => newImage.path === oldImage.path)
      );
      
      // Delete removed images from storage
      await Promise.all(
        removedImages.map(image => deletePropertyImage(image.path))
      );
    }

    const propertyRef = doc(db, 'properties', propertyId);
    const timestamp = new Date();
    await setDoc(propertyRef, { ...updates, updatedAt: timestamp }, { merge: true });
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
};