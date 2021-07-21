import { useEffect, useState } from 'react'
import { CommandButton } from './CommandButton'

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

  useEffect(() => {
    let check = 0
    NGwords.forEach((ng) => {
      if (tweet.includes(ng)) check++
    })
    if (check === 1) setNg(true)
  }, [tweet])
  return (
    <>
      {ng ? (
        <div>あなたはNGワードをツイートしようとしました。やめてください</div>
      ) : (
        <CommandButton
          bg="#2687e8"
          label="アソビノンのツイッターに投稿する"
          isMcCommand
          command={`webhooks execute command-tweet ${tweet}`}
        />
      )}
      <textarea
        className="border-2 rounded-xl p-3 border-gray-500"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
      />
    </>
  )
}
