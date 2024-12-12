import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

export const uploadPropertyImage = async (file: File, propertyId: string) => {
  try {
    const timestamp = Date.now();
    const storageRef = ref(storage, `properties/${propertyId}/${timestamp}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return { url, path: snapshot.ref.fullPath, error: null };
  } catch (error) {
    return { url: null, path: null, error: error as Error };
  }
};

export const deletePropertyImage = async (path: string) => {
  try {
    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
};