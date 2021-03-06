export interface User {
  uid: string
  isAnonymous: boolean
  name: string
  email: string
  photoURL: string
  twitterIdNum?: string
  isAdmin?: boolean
}
