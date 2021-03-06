import { useState } from 'react'
import { useAuthentication } from '../../hooks/authentication'
import { CommandButton } from './CommandButton'
import { TweetButton } from './TweetButton'

const ControlPanel: React.FC = () => {
  const { user } = useAuthentication()
  const commandPath = 'bash /home/minecraft/script/'
  const [input, setInput] = useState('こんにちは')

  return (
    <div className="p-3">
      {user && user.isAdmin ? (
        <>
          <h2 className="font-bold text-2xl mb-4">コントロールパネル</h2>
          <p className="mb-8">
            SSHを遠隔で操作します。決められたコマンドだけ実行でき、連打はできません。
          </p>
          <div className="flex flex-col gap-6 justify-items-start">
            <TweetButton />
            <hr />
            <CommandButton
              bg="#fb76e9"
              label="sayコマンドを自由に入力"
              isMcCommand
              command={`say ${input}`}
            />
            <textarea
              className="border-2 rounded-xl p-3 border-gray-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <hr />
            <CommandButton
              bg="#28e7a9"
              label="ようこそメッセージ"
              command={commandPath + 'message.sh'}
            />
            <CommandButton
              bg="green"
              label="経験値配布"
              command={commandPath + 'give_exp.sh'}
            />

            <hr />
            <CommandButton
              bg="blue"
              label="メモリチェック"
              command={commandPath + 'check_memory.sh'}
            />

            <CommandButton
              bg="black"
              label="CPU使用率確認"
              command={`mpstat`}
            />
            <hr />
            <CommandButton
              bg="#ff6600"
              label="セーブ"
              command={commandPath + 'save_all.sh'}
            />
            <CommandButton
              bg="#888"
              label="起動中か確認"
              command={`screen -ls`}
            />
            <CommandButton
              bg="red"
              label="サーバー起動"
              command={commandPath + 'start.sh'}
            />
            <CommandButton
              bg="#447722"
              label="資源ワールド再生成"
              command={commandPath + 'regen.sh'}
            />
            <hr />
            <CommandButton
              bg="#2687e8"
              label="バックアップ一覧 (total10G超えてたらsasigumeに連絡して!)"
              command={`du -shc /home/minecraft/world_backup/*`}
            />
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
