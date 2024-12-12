import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './config';
import { UserData, UserRole } from '../types/user';

export const createUserDocument = async (uid: string, email: string) => {
  try {
    const userData: UserData = {
      email,
      role: 'Tenant', // Default role
      createdAt: new Date(),
    };

    await setDoc(doc(db, 'users', uid), userData);
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
};

export const getUserData = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { data: userDoc.data() as UserData, error: null };
    }
    return { data: null, error: new Error('User document not found') };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const updateUserProfile = async (uid: string, profileData: {
  email: string;
  name: string;
  phone: string;
  invoiceEmail: string;
  address: string;
}) => {
  try {
    await setDoc(doc(db, 'users', uid), profileData, { merge: true });
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
};

export const updateUserRole = async (uid: string, role: UserRole) => {
  try {
    await setDoc(doc(db, 'users', uid), { role }, { merge: true });
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
};