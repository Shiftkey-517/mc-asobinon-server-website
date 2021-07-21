import { GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { AdminList } from '../components/AdminList'
import ControlPanel from '../components/ControlPanel'
import Layout from '../components/Layout'
import { InferGetStaticPropsType } from 'next'
import { ADMIN_TWITTER_NUMIDS } from '../lib/admin'
import { TwitterUser } from '../models/TwitterUser'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const admins = await Promise.all(
    ADMIN_TWITTER_NUMIDS.map(async (id) => {
      return await fetch(
        `${process.env.NEXT_PUBLIC_HTTPS_URL}/api/get-twitter-user?id=${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `${process.env.API_TOKEN}`,
          },
        }
      )
        .then(async (res) => {
          return (await res.json()) as TwitterUser
        })
        .catch((e) => {
          console.error(e)
        })
    })
  ).then(async (admins) => {
    // voidを除外する
    const arr: TwitterUser[] = []
    admins.map((a) => {
      if (a) arr.push(a)
    })
    return arr.sort((a, b) => {
      return b.followers_count - a.followers_count
    })
  })
  return {
    props: {
      admins,
    },
  }
}

const Home: NextPage<Props> = (props) => {
  return (
    <Layout>
      <NextSeo
        title="アソビノンサーバー管理サイト"
        description="アソビノンサーバー管理サイト"
        openGraph={{
          type: 'website',
        }}
      />
      <div className="justify-center flex flex-col">
        <div className="mb-8">
          <AdminList admins={props.admins ?? []} />
        </div>
        <div>
          <ControlPanel />
        </div>
      </div>
    </Layout>
  )
}

export default Home
