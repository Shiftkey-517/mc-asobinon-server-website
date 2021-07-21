import { useEffect, useState } from 'react'

export const TweetButton: React.FC = () => {
  const [tweet, setTweet] = useState<string>()
  const [message, setMessage] = useState<string>()
  const [status, setStatus] = useState<string>()
  const [tweetId, setTweetId] = useState<string>()
  const [date, setDate] = useState<string>()
  const [used, setUsed] = useState(false)

  useEffect(() => {
    if (tweet && tweet?.length > 0) {
      setUsed(false)
    }
  }, [tweet])

  const api = `${process.env.NEXT_PUBLIC_HTTPS_URL}/api/post-tweet`
  const tweetUrl = `https://twitter.com/asobinon/status/${tweetId}`

  const send = async () => {
    return await fetch(api, {
      method: 'POST',
      headers: {
        Authorization: process.env.API_TOKEN ?? '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tweet }),
    }).then(async (result) => {
      const json = await result.json()
      // APIからメッセージを返す
      setTweet('')
      setTweetId(json.id_str)
      setMessage(json.message ?? 'API自体を呼べませんでした')
      setStatus(result.statusText)
      setDate(new Date().toLocaleString('ja-JP'))
      return
    })
  }

  return (
    <>
      <div
        style={{ background: '#2687e8' }}
        className="p-3 rounded-xl text-white"
      >
        <div className="flex justify-between text-xl items-start">
          <h3 className="font-bold">
            botでツイートする
            {status && ` : ${status}`}
          </h3>

          {tweet ? (
            <>
              {/* 実行後はボタンを隠す */}
              {!used ? (
                <a
                  className="p-3 block bg-black rounded-xl cursor-pointer shadow-md hover:shadow-xl"
                  onClick={() => {
                    setUsed(true)
                    send()
                  }}
                >
                  実行!
                </a>
              ) : (
                <b>最終実行: {date}</b>
              )}
            </>
          ) : (
            <>内容を書いてください</>
          )}
        </div>

        <pre className="whitespace-pre-line font-mono bg-gray-700 mt-3 p-3 rounded-xl">
          <div>ツイートAPIからのメッセージ:</div>
          <div>{message}</div>
          {tweetId && (
            <p>
              ツイート:{' '}
              <a href={tweetUrl} target="_blank" rel="noreferrer">
                {tweetUrl}
              </a>
            </p>
          )}
        </pre>
      </div>
      <textarea
        className="border-2 rounded-xl p-3 border-gray-500"
        value={tweet}
        placeholder="ツイート内容"
        onChange={(e) => setTweet(e.target.value)}
      />
    </>
  )
}
