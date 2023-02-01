import { getFirestoreInstance, handleGetUserDocs } from 'features/db/services';
import {
  collection,
  DocumentData,
  getDocs,
  QuerySnapshot,
} from 'firebase/firestore';

export const useDb = () => {
  const firestoreDb = getFirestoreInstance();

  const getUserDocs = (): Promise<QuerySnapshot<DocumentData>> =>
    handleGetUserDocs({ firestoreDb, collection, getDocs });

  return { getUserDocs };
};
