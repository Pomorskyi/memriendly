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

  // useEffect(() => {
  //   setUsers(getAllTable('users'))
  // }, [getAllTable('users')])

  // useEffect(() => {
  //   setChannels(getAllTable('channels'))
  // }, [getAllTable('channels')])

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

  // function updateUsersTable() {
  //   getAllTable('users').then((res) => setUsers(res))
  // }

  function setState(name, res) {
    if(name === 'channels') {
      setChannels(res)
    } else if(name === 'users') {
      setUsers(res)
    }
  }

  function updateTable(nameOfTable) {
    return new Promise((resolve) => {
      getAllTable(nameOfTable)
        .then((res) => {
          setState(nameOfTable, res)
          resolve(res)
        })
    })
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
    return set(ref(database, tableName + '/' + id), data);
  }
  
  function createChannel(currentUser, name, description = '', photoUrl = '') {
    return new Promise((resolve, reject) => {
      updateTable('channels').then(() => {
        const hasDuplicates = Object.keys(channels).find(key => channels[key].name === name)

        if(_.isNil(hasDuplicates)){
          const dateOfCreation = new Date().toString()
          const idOfChannel = sha256(JSON.stringify(currentUser) + 
            dateOfCreation + 
            name);
  
          write('channels', idOfChannel, {
            owner: currentUser.uid,
            name: name,
            subscribers: [],
            dateOfCreation: dateOfCreation,
            description: description,
            listOfMessages: [],
            isChatOrPublic: 'public',
            photoUrl: photoUrl,
            inputtedMessage: ''
          }).then(() => resolve(idOfChannel))
        } else {
          reject('This name of channel is unavailable')
        }
      })
    })
  }

  function writeChannelObj(id, obj) {
    write('channels', id, obj)
  }

  function writeMessage(channelId, owner, message) {
    return new Promise((resolve) => {
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
      newChannels[channelId] = newChannelObj
      setChannels(newChannels)
      resolve()
    })
  }

  function writeUser(userId, email) {
    return new Promise((resolve, reject) => {
      updateTable('users').then(() => {
        const hasDuplicates = Object.keys(users).forEach(key => users[key].email === email)

        if(hasDuplicates === undefined){
          write('users', userId, {
            email: email,
            listofOwnChanels: [],
            listOfSubscribedChannels: [],
            nickname: userId
          }).then(() => resolve('success'))
        } else {
          reject('This email is already used')
        }
      })
    })


    
  }

  function writeUserObj(userId, obj) {
    write('users', userId, obj)
  }

  function updateNickname(userId, nickname) {
    write('users', userId, {
      email: users[userId].email,
      listofOwnChanels: users[userId].listofOwnChanels,
      nickname: nickname
    })
  }

  const value = {
    users,
    channels,
    writeUser,
    writeUserObj,
    createChannel,
    writeChannelObj,
    writeMessage,
    updateNickname,
    updateTable,
    getAllTable
  };

  return (
    <DatabaseContext.Provider value={value}>
      {!loading && children}
    </DatabaseContext.Provider>
  )
}
