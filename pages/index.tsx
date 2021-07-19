import { NextSeo } from 'next-seo'
import ControlPanel from '../components/ControlPanel'
import Layout from '../components/Layout'

const Home: React.FC = () => {
  return (
    <Layout>
      <NextSeo
        title="アソビノンサーバー管理サイト"
        description="アソビノンサーバー管理サイト"
        openGraph={{
          type: 'website',
        }}
      />
      <div>
        <ControlPanel />
      </div>
    </Layout>
  )
}

export default Home
