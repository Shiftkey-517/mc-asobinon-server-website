import { useState } from 'react'
const sendCommand = async (
  command: string
): Promise<{ message: string; statusText: string; date: string }> => {
  const api = `${process.env.NEXT_PUBLIC_HTTPS_URL}/api/exec-command`

  return await fetch(api, {
    method: 'POST',
    headers: {
      Authorization: process.env.API_TOKEN ?? '',
    },
    body: JSON.stringify({
      command,
    }),
  }).then(async (result) => {
    const json = await result.json()

    // APIからメッセージを返す
    return {
      message: json.message ?? 'API自体を呼べませんでした',
      statusText: result.statusText,
      date: new Date().toLocaleString('ja-JP'),
    }
  })
}

export const CommandButton: React.FC<{
  bg: string
  label: string
  command: string
}> = ({ bg, command, label }) => {
  const [message, setMessage] = useState<string>()
  const [status, setStatus] = useState<string>()
  const [date, setDate] = useState<string>()
  const [used, setUsed] = useState(false)
  return (
    <div
      style={{ background: bg ?? '#fff' }}
      className="p-3 rounded-xl text-white"
    >
      <div className="flex justify-between text-xl items-start">
        <h3 className="font-bold">
          {label}
          {status && ` : ${status}`}
        </h3>

        {/* 実行後はボタンを隠す */}
        {!used ? (
          <a
            className="p-3 block bg-black rounded-xl cursor-pointer shadow-md hover:shadow-xl"
            onClick={() =>
              sendCommand(command).then((m) => {
                setUsed(true)
                setMessage(m.message)
                setStatus(m.statusText)
                setDate(m.date)
              })
            }
          >
            実行!
          </a>
        ) : (
          <b>最終実行: {date}</b>
        )}
      </div>

      <pre className="font-mono bg-gray-700 mt-3 p-3 rounded-xl">
        <div>{`minecraft@sasigume-mc:~$ ${command}`}</div>
        <div>{message}</div>
      </pre>
    </div>
  )
}
