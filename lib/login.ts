import firebase from 'firebase/app'

export const login = async (): Promise<void> => {
  const provider = new firebase.auth.TwitterAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      console.debug('Successfully signed in')
    })
    .catch((e) => {
      console.error(e)
    })
}
