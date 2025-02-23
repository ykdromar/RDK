import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
  getCountFromServer,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import firebaseApp from "./firebaseConfig";

const db = getFirestore(firebaseApp);

const addData = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef;
  } catch (error) {
    console.log("Error in adding data: ", error);
    return null;
  }
};

const setData = async (collectionName, id, data) => {
  try {
    await setDoc(doc(db, collectionName, id), data);
  } catch (error) {
    console.log("Error in setting data: ", error);
  }
};

const getAllDocs = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        uid: doc.id,
        data: doc.data(),
      });
    });
    return data;
  } catch (error) {
    console.log("Error in fetching data: ", error);
  }
};

const getSingleDoc = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.log("Error ", error);
  }
};

const getRealTimeData = (collectionName, docId, setData, setLoading) => {
  try {
    const docRef = doc(db, collectionName, docId);
    onSnapshot(docRef, (doc) => {
      setData(doc.data());
      if (doc.data() != null) {
        setLoading(false);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const updateData = async (collectionName, docId, data) => {
  try {
    await updateDoc(doc(db, collectionName, docId), data);
  } catch (error) {
    console.log("Error in updating data: ", error);
  }
};

const deleteData = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    console.log("Error in deleting data: ", error);
  }
};

const getDocumentsCount = async (collectionName) => {
  try {
    const snapshot = await getCountFromServer(collection(db, collectionName));
    return snapshot.data().count;
  } catch (error) {
    console.log("Error in getting count: ", error);
  }
};

const queryData = async (collectionName, searchBy, searchValue) => {
  try {
    let q = query(
      collection(db, collectionName),
      where(searchBy, "==", searchValue)
    );
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        uid: doc.id,
        data: doc.data(),
      });
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  addData,
  setData,
  getAllDocs,
  updateData,
  getSingleDoc,
  getRealTimeData,
  deleteData,
  getDocumentsCount,
  queryData,
};
export default db;
