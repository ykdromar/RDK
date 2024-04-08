import firebaseApp from "./firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const auth = getAuth(firebaseApp);

const firebaseLogin = async ({ email, password }) => {
  try {
    let userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    let user = userCredentials.user;
    return user;
  } catch (error) {
    console.log("ERROR IN LOGIN : " + error);
  }
};

const firebaseLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Error in logging out ", error);
  }
};

const firebaseGetUser = async (setUser, setLoading) => {
  try {
    onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
    });
  } catch (error) {
    console.log("ERROR IN Fetching user: " + error);
  }
};

export { firebaseLogin, firebaseLogout, firebaseGetUser };
