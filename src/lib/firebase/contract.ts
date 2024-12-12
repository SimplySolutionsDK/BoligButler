import { collection, doc, setDoc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from './config';
import { Contract } from '../../types/contract';

export const createContract = async (contract: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const contractRef = doc(collection(db, 'contracts'));
    const timestamp = new Date();
    const contractData: Contract = {
      ...contract,
      id: contractRef.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await setDoc(contractRef, contractData);
    return { contract: contractData, error: null };
  } catch (error) {
    return { contract: null, error: error as Error };
  }
};

export const getContract = async (contractId: string) => {
  try {
    const contractDoc = await getDoc(doc(db, 'contracts', contractId));
    if (contractDoc.exists()) {
      return { contract: contractDoc.data() as Contract, error: null };
    }
    return { contract: null, error: new Error('Contract not found') };
  } catch (error) {
    return { contract: null, error: error as Error };
  }
};

export const getContracts = async (userId: string, role: 'Landlord' | 'Tenant') => {
  try {
    const q = query(
      collection(db, 'contracts'),
      where(role === 'Landlord' ? 'landlordId' : 'tenantId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const contracts = querySnapshot.docs.map(doc => doc.data() as Contract);
    return { contracts, error: null };
  } catch (error) {
    return { contracts: [], error: error as Error };
  }
};

export const updateContract = async (contractId: string, updates: Partial<Contract>) => {
  try {
    const contractRef = doc(db, 'contracts', contractId);
    const timestamp = new Date();
    await setDoc(contractRef, { ...updates, updatedAt: timestamp }, { merge: true });
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
};