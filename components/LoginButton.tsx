import { useAuthentication } from '../hooks/authentication'
import { login } from '../lib/login'
import Image from 'next/image'

const LoginButton: React.FC = () => {
  const { user } = useAuthentication()
  return (
    <>
      {user ? (
        <>
          <div className="flex items-center align-middle justify-center gap-8">
            <div
              className="flex gap-3 items-center align-middle "
              aria-label="現在のユーザー"
            >
              <div className="rounded-full w-8 h-8 overflow-hidden">
                <Image
                  width={32}
                  height={32}
                  alt={`${user.name}のアイコン`}
                  src={
                    user.photoURL ??
                    `${process.env.NEXT_PUBLIC_HTTPS_URL}/favicon.ico`
                  }
                />
              </div>
              <b>{user.name}</b>
            </div>
            <a
              aria-label="ログアウトボタン"
              className="shadow-lg rounded-lg cursor-pointer block p-3 bg-red-500 text-white"
              onClick={login}
            >
              ログアウト
            </a>
          </div>
        </>
      ) : (
        <a
          className="shadow-lg rounded-lg cursor-pointer block p-3 bg-blue-500 font-bold text-white text-lg"
          onClick={login}
        >
          ログイン
        </a>
      )}
    </>
  )
}

export default LoginButton
