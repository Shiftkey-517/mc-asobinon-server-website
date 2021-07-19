import { useAuthentication } from '../hooks/authentication'
import { CommandButton } from './CommandButton'

const ControlPanel: React.FC = () => {
  const { user } = useAuthentication()
  const commandPath = 'bash /home/minecraft/script/'
  return (
    <div className="p-3">
      {user && user.isAdmin ? (
        <>
          <h2 className="font-bold text-2xl mb-4">コントロールパネル</h2>
          <p className="mb-8">
            SSHを遠隔で操作します。決められたコマンドだけ実行でき、連打はできません。
          </p>
          <div className="flex flex-col gap-6 justify-items-start">
            <CommandButton
              bg="black"
              label="CPU使用率確認"
              command={`mpstat`}
            />
            <CommandButton
              bg="#888"
              label="起動中か確認"
              command={`screen -ls`}
            />
            <CommandButton
              bg="green"
              label="経験値配布"
              command={commandPath + 'give_exp.sh'}
            />
            <CommandButton
              bg="#ff6600"
              label="セーブ"
              command={commandPath + 'save_all.sh'}
            />
            <CommandButton
              bg="blue"
              label="セーブ・メモリチェック・メッセージ全部"
              command={commandPath + 'check_screen.sh'}
            />
            <CommandButton
              bg="red"
              label="サーバー再起動"
              command={commandPath + 'restart.sh'}
            />
            <CommandButton bg="#fb76e9" label="おまけ: SL" command={`sl`} />
          </div>
        </>
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
