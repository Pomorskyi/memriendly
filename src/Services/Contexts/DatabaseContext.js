import React, { useContext, useState, useEffect } from 'react'
import { database } from './firebase';
import { ref, set, child, get } from "firebase/database";



// const starCountRef = ref(db, 'posts/' + postId + '/starCount');
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });
const DatabaseContext = React.createContext()

export function useDb() {
  return useContext(DatabaseContext);
}

export function DatabaseProvider({ children }) {
  const dbRef = ref(database);
//   const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true);

  function readData(){
    return get(child(dbRef, `users`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  // function writeUserData(userId, imageUrl) {
  //   return set(ref(database, 'users/' + userId), {
  //     // username: name,
  //     // email: email,
  //     profile_picture : imageUrl
  //   });
  // }

//   function updatePasswordCustom(password) {
    // return updatePassword(currentUser, password);
//   }


//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(getAuth(), user => {
//       setCurrentUser(user)
//       setLoading()
//     })

//     return unsubscribe
//   }, [])

  const value = {
    // writeUserData,
    readData
    // resetPassword,
    // updateEmailCustom,
    // updatePasswordCustom,
    // updateProfileCustom
  }

  return (
    <DatabaseContext.Provider value={value}>
      {!loading && children}
    </DatabaseContext.Provider>
  )
}




// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState()
//   const [loading, setLoading] = useState(true);

//   function login(email, password) {
//     return signInWithEmailAndPassword(getAuth(), email, password)
//   }

//   function signup(email, password) {
//     return createUserWithEmailAndPassword(getAuth(), email, password)
//   }

//   function logout() {
//     return signOut(getAuth())
//   }

//   function resetPassword(email) {
//     return sendPasswordResetEmail(getAuth(), email)
//   }

//   function updateEmailCustom(email) {
//     return updateEmail(currentUser, email);
//   }

//   function updatePasswordCustom(password) {
//     return updatePassword(currentUser, password);
//   }

//   // ex. dataObj = {displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"}
//   function updateProfileCustom(dataObj) {
//     return updateProfile(currentUser, dataObj);
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(getAuth(), user => {
//       setCurrentUser(user)
//       setLoading()
//     })

//     return unsubscribe
//   }, [])

//   const value = {
//     currentUser,
//     signup,
//     login,
//     logout,
//     resetPassword,
//     updateEmailCustom,
//     updatePasswordCustom,
//     updateProfileCustom
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }
