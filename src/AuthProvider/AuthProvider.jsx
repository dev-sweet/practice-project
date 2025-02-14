import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// create a context
export const AuthContext = createContext(null);

const auth = getAuth(app);

// auth provider
const AuthProvider = ({ children }) => {
  // user state
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // google auth provider
  const provider = new GoogleAuthProvider();

  // create an user with only email and password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // signin an user with email and password
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google pop up login
  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  // logout the user
  const logOut = () => {
    return signOut(auth);
  };

  // monitor user if loggin or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoading(false);
      } else {
        setUser(null);
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  // user info
  const userInfo = {
    isLoading,
    user,
    createUser,
    signIn,
    googleSignIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
