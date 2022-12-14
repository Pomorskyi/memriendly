import React, { useContext, useState, useEffect } from 'react'
import { useDatabase } from '../../Services/Contexts/DatabaseContext';
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
  const { writeUser, updateTable } = useDatabase()

  function login(email, password) {
    return signInWithEmailAndPassword(getAuth(), email, password)
      .then((res) => writeUser(res.user.uid, email))
      .then((res) => updateTable('users'))
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(getAuth(), email, password)
      .then((res) => writeUser(res.user.uid, email))
      .then((res) => updateTable('users'))
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
    updatePasswordCustom
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
