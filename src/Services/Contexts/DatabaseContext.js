import React, { useContext, useState, useEffect } from 'react'
import { database } from './firebase';
import { sha256 } from 'js-sha256';
import _ from 'lodash';
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

  function clearDuplicates() {
    set(ref(database, 'channels/127b82dd31714b6d54cd85a82e78ea5914764c202716de1a1c354499aff64f43'), null);
  }

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
      photoUrl: '',
      inputtedMessage: ''
    })
  }

  function writeMessage(channelId, owner, message) {
    const currentChannel = channels[channelId];
    const messageStack = (_.isNil(currentChannel.messageStack) ? [] : currentChannel.messageStack)
    messageStack.push({
      message: message,
      owner: owner,
      datatime: new Date().toString()
    })

    const newChannelObj = _.clone(channels[channelId])
    newChannelObj.messageStack = messageStack

    write('channels', channelId, newChannelObj)

    const newChannels = _.clone(channels)
    // const newChannel = _.clone(channels[channelId])
    // newChannelObj.messageStack = messageStack
    newChannels[channelId] = newChannelObj
    setChannels(newChannels)
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
    writeChannel,
    writeMessage,
    clearDuplicates
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
