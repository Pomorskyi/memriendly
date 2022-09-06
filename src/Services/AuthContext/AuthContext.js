import React, { useContext, useState, useEffect } from 'react'
import { auth } from './firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
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

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(user => {
      // console.log(user)
      setCurrentUser(user)
      setLoading()
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
