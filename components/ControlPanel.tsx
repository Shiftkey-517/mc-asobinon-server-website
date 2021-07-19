import { useAuthentication } from '../hooks/authentication'

const ControlPanel: React.FC = () => {
  const { user } = useAuthentication()
  return (
    <div className="p-3">
      {user && user.isAdmin ? (
        <>コントロールパネルへようこそ</>
      ) : (
        <>
          {user ? (
            <p>
              あなたは操作できません。
              <a
                href="https://github.com/sasigume/mc-asobinon-server-website#readme"
                target="_blank"
                rel="noreferrer"
              >
                こちら
              </a>
              の手順で認証を申請してください
            </p>
          ) : (
            <p>ログインしてください</p>
          )}
        </>
      )}
    </div>
  )
}

export default ControlPanel
