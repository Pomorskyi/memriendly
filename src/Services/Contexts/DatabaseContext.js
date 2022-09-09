import React, { useContext, useState, useEffect } from 'react'
import { database } from './firebase';
import { sha256 } from 'js-sha256';
import { ref, set, child, get } from "firebase/database";

const DatabaseContext = React.createContext()

export function useDatabase() {
  return useContext(DatabaseContext);
}

export function DatabaseProvider({ children }) {
  const dbRef = ref(database);
  const [users, setUsers] = useState([])
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        getAllTable('users').then((res) => setUsers(res))
        getAllTable('channels').then((res) => setChannels(res))
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [])

  // name = { users, channels }
  async function getAllTable(name) {
    return await get(child(dbRef, name))
      .then((snapshot) => {
        return snapshot.exists() ? snapshot.val() : []
      }).catch((error) => {
        console.error(error);
      });
  }

  function write(tableName, id, data) {
    console.log(data)
    set(ref(database, tableName + '/' + id), data);
  }
  
  function writeChannel(currentUser, name) {
    const dateOfCreation = new Date().toString()
    const idOfChannel = sha256(JSON.stringify(currentUser) + 
      dateOfCreation + 
      name);

    write('channels', idOfChannel, {
      owner: currentUser.uid,
      name: name,
      dateOfCreation: dateOfCreation,
      description: '',
      listOfMessages: [],
      isChatOrPublic: 'public',
      photoUrl: ''
    })
  }

  function writeUser(userId, email) {
    write('users', userId, {
      email: email,
      listofOwnChanels: []
    })
  }

  const value = {
    users,
    channels,
    writeUser,
    writeChannel
    // readData
    // resetPassword,
    // updateEmailCustom,
    // updatePasswordCustom,
    // updateProfileCustom
  };

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
