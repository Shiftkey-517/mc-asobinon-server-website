import firebase from 'firebase/app'

export const logout = async (): Promise<void> => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.debug('Successfully signed out')
    })
    .catch((e) => {
      console.error(e)
    })
}
