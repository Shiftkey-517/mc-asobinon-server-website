import { NextSeo } from 'next-seo'
import ControlPanel from '../components/ControlPanel'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.scss'

const Home: React.FC = () => {
  return (
    <Layout>
      <NextSeo
        title="アソビノンサーバー"
        description="アソビノンサーバー管理サイト"
        openGraph={{
          type: 'website',
        }}
      />
      <h1 className={`text-center uppercase ${styles.title}`}>
        アソビノンサーバー
      </h1>
      <ControlPanel />
    </Layout>
  )
}

export default Home
