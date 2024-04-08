import { toast } from "react-toastify";
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
    if (user) {
      toast.success("Logged in successfully");
    }
    return user;
  } catch (error) {
    toast.error("Invalid email/passoword");
    console.log("ERROR IN LOGIN : " + error);
  }
};

const firebaseLogout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully");
  } catch (error) {
    toast.error("Failed to logout!");
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
