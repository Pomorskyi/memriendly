import React, { useContext, useState, useEffect } from 'react'
import { database } from './firebase';
import { sha256 } from 'js-sha256';
import _ from 'lodash';
import { useNavigate  } from 'react-router-dom'
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
  const navigate  = useNavigate()

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
      navigate("/signup")
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

  function updateChannel(channelId, name = '', description = '', photoUrl = '') {
    return new Promise((resolve, reject) => {
      updateTable('channels').then(() => {
          var objectCopy = _.cloneDeep(channels[channelId])
          if(description.length > 0){
            objectCopy = {
              ...objectCopy,
              description: description
            }
          }
          if(photoUrl.length > 0){
            objectCopy = {
              ...objectCopy,
              photoUrl: photoUrl
            }
          }
          if(name.length > 0){
            objectCopy = {
              ...objectCopy,
              name: name
            }
          }
          const hasDuplicates = Object.keys(channels).find(key => channels[key].name === name)
          if(!_.isNil(hasDuplicates)){
            reject('This name of channel is unavailable')
            return 
          }

          write('channels', channelId, objectCopy)
            .then(() => resolve())
    })
  })
}

  function writeChannelObj(id, obj) {
    return new Promise((resolve) => {
      write('channels', id, obj).then(() => {
        resolve()
      })
    })
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
        console.log(users)
        const hasDuplicates = users ? Object.keys(users).forEach(key => users[key].email === email) : false

        if(!hasDuplicates){
          write('users', userId, {
            email: email,
            listofOwnChanels: [],
            nickname: userId
          }).then(() => resolve('success'))
        } else {
          reject('This email is already used')
        }
      })
    })
  }

  function writeUserObj(userId, obj) {
    return new Promise((resolve) => {
      write('users', userId, obj).then(() => {
        resolve()
      })
    })
  }

  function updateNickname(userId, nickname) {
    return new Promise((resolve, reject) => {
      if(nickname.length > 2) {
        var newObj = _.cloneDeep(users[userId])
    
        newObj = {
          ...newObj,
          nickname: nickname
        }
  
        write('users', userId, newObj).then(() => {
          resolve()
        })
      } else {
        reject('Need to be more than 3 letters in nickname')
      }
    })
  }

  const value = {
    users,
    channels,
    writeUser,
    writeUserObj,
    createChannel,
    updateChannel,
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
