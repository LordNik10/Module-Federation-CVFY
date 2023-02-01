import { firebaseConfig } from 'features/auth/config';
import { initializeApp } from 'firebase/app';
import {
  Firestore,
  CollectionReference,
  DocumentData,
  Query,
  QuerySnapshot,
  getFirestore,
} from 'firebase/firestore';

interface IHandleGetUserDocs {
  firestoreDb: Firestore;
  collection: (
    firestore: Firestore,
    path: string,
    ...pathSegments: string[]
  ) => CollectionReference<DocumentData>;
  getDocs: (param: Query) => Promise<QuerySnapshot<DocumentData>>;
}

const app = initializeApp(firebaseConfig);

export const getFirestoreInstance = () => getFirestore(app);

export const handleGetUserDocs = async ({
  collection,
  firestoreDb,
  getDocs,
}: IHandleGetUserDocs) => {
  const usersCollectionRef = collection(firestoreDb, 'users');
  const data = await getDocs(usersCollectionRef);
  // eslint-disable-next-line no-console
  return data;
};
