import firebase from '../lib/firebase'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { User } from '../models/User'
import { SITE_FULL_URL } from '../lib/constants'
import { ADMIN_TWITTER_NUMIDS } from '../lib/admin'

const userState = atom<User | null>({
  key: 'user',
  default: null,
})

// サーバー管理者を数字IDで判定
const checkIsAdmin = (idNum: User['twitterIdNum']): boolean => {
  if (!idNum) return false
  let check = 0
  ADMIN_TWITTER_NUMIDS.forEach((admin) => {
    if (idNum === admin) check++
  })
  if (check === 1) return true
  return false
}

// 参考: https://zenn.dev/dala/books/nextjs-firebase-service

export function useAuthentication(): { user: User | null } {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (user !== null) {
      return
    }

    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        const twitterIdNum = firebaseUser.providerData[0]?.uid
        const loginUser: User = {
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
          name: firebaseUser.displayName ?? '未設定',
          email: firebaseUser.email ?? '',
          photoURL: firebaseUser.photoURL ?? `${SITE_FULL_URL}/favicon.png`,
          twitterIdNum,
          isAdmin: checkIsAdmin(twitterIdNum),
        }
        setUser(loginUser)
      } else {
        setUser(null)
      }
    })
  }, [])

  return { user }
}
