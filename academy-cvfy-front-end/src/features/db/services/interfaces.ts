import { QuerySnapshot, DocumentData } from 'firebase/firestore';

export type UserDocs = () => Promise<QuerySnapshot<DocumentData>>;
