import { useEffect, useState } from 'react'

const NGwords: string[] = [
  'うんこ',
  'しっこ',
  'あああ',
  '死ね',
  'aaaaa',
  'bbbbb',
  'おっぱい',
  '県',
  '市',
  '郡',
  '町',
  '区',
  '安藤',
  '妙法寺',
  'GM',
  'あんま',
  'かたわ',
  '蚊',
  '片眼',
  '人足',
  '変態',
  '野獣先輩',
  '乞食',
  '朝鮮人',
  '支那',
  '土人',
  'ガイジ',
  'キチガイ',
  'セクハラ',
  'アル中',
  'ルンペン',
  '殺す',
  'コロシ',
]

export const TweetButton: React.FC = () => {
  const [tweet, setTweet] = useState('ツイート内容')
  const [ng, setNg] = useState(false)
  const [message, setMessage] = useState<string>()
  const [status, setStatus] = useState<string>()
  const [date, setDate] = useState<string>()
  const [used, setUsed] = useState(false)

  useEffect(() => {
    let check = 0
    NGwords.forEach((ng) => {
      if (tweet.includes(ng)) check++
    })
    if (check === 1) setNg(true)
  }, [tweet])

  const api = `${process.env.NEXT_PUBLIC_HTTPS_URL}/api/post-tweet`

  const send = async () => {
    return await fetch(api, {
      method: 'POST',
      headers: {
        Authorization: process.env.API_TOKEN ?? '',
      },
      body: JSON.stringify({
        tweet,
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

  return (
    <>
      {ng ? (
        <div>あなたはNGワードをツイートしようとしました。やめてください</div>
      ) : (
        <div
          style={{ background: '#2687e8' }}
          className="p-3 rounded-xl text-white"
        >
          <div className="flex justify-between text-xl items-start">
            <h3 className="font-bold">
              botでツイートする
              {status && ` : ${status}`}
            </h3>

            {/* 実行後はボタンを隠す */}
            {!used || used ? (
              <a
                className="p-3 block bg-black rounded-xl cursor-pointer shadow-md hover:shadow-xl"
                onClick={() => {
                  setUsed(true)
                  send().then((m) => {
                    setMessage(m.message)
                    setStatus(m.statusText)
                    setDate(m.date)
                  })
                }}
              >
                実行!
              </a>
            ) : (
              <b>最終実行: {date}</b>
            )}
          </div>

          <pre className="whitespace-pre-line font-mono bg-gray-700 mt-3 p-3 rounded-xl">
            <div>ツイートAPIからのメッセージ:</div>
            <div>{message}</div>
          </pre>
        </div>
      )}
      <textarea
        className="border-2 rounded-xl p-3 border-gray-500"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
      />
    </>
  )
}
