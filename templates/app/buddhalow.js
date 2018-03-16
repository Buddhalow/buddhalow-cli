import { AsyncStorage } from 'react-native'
import { CLIENT_ID, CLIENT_SECRET, TOKEN_URL } from './credentials'
class Buddhalow {
  async logIn(username, password) {
    return new Promise((resolve, reject) => {
      fetch(
        `${TOKEN_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&scope=read+write&grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST'
        }).then(response => {
          return response.json()
        }).then(async result => {
          result.issued = new Date().getTime()
          let session = JSON.stringify(result)
          await AsyncStorage.setItem('session', session)
          resolve(session)
        }, error => {
          reject(error)
        }
      )
    })
  }
  async refresh(refreshToken) {
    fetch(
      `${TOKEN_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${encodeURIComponent(refreshToken)}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST'
      }).then(response => {
        return response.json()
      }).then(async result => {
        result.issued = new Date().getTime()
        let session = JSON.stringify(result)
        await AsyncStorage.setItem('session', session)
        resolve(session)
      }, error => {
        reject(error)
      }
    )
  }
  async isLoggedIn() {
    return !!this.session
  }
  async getSession() {
    let strSession = await AsyncStorage.getItem('session')
    if (!strSession)
      return null
    
    let session = JSON.parse(strSession)
    if (session) {
      if (new Date().getTime() > session.issued + session.expires_in * 1000) {
        session = await this.refreshToken(session.refresh_token)
        await AsyncStorage.setItem('session', session)
      }
      return session
    }
    return null
  }
}

export default new Buddhalow()
