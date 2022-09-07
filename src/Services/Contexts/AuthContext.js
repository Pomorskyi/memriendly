import React, { useContext, useState, useEffect } from 'react'
import { auth } from './firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
  updateProfile
} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    return signInWithEmailAndPassword(getAuth(), email, password)
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(getAuth(), email, password)
  }

  function logout() {
    return signOut(getAuth())
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(getAuth(), email)
  }

  function updateEmailCustom(email) {
    return updateEmail(currentUser, email);
  }

  function updatePasswordCustom(password) {
    return updatePassword(currentUser, password);
  }

  // ex. dataObj = {displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"}
  function updateProfileCustom(dataObj) {
    return updateProfile(currentUser, dataObj);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      setCurrentUser(user)
      setLoading()
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmailCustom,
    updatePasswordCustom,
    updateProfileCustom
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
