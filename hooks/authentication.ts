import firebase from '../lib/firebase'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { User } from '../models/User'
import { SITE_FULL_URL } from '../lib/constants'

const userState = atom<User | null>({
  key: 'user',
  default: null,
})

// 参考: https://zenn.dev/dala/books/nextjs-firebase-service

export function useAuthentication(): { user: User | null } {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (user !== null) {
      return
    }

    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        const loginUser: User = {
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
          name: firebaseUser.displayName ?? '未設定',
          email: firebaseUser.email ?? '',
          photoURL: firebaseUser.photoURL ?? `${SITE_FULL_URL}/favicon.png`,
          twitterIdNum: firebaseUser.providerData[0]?.uid,
        }
        console.debug({ firebaseUser })
        setUser(loginUser)
      } else {
        setUser(null)
      }
    })
  }, [])

  return { user }
}
