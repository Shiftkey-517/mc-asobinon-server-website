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
      <div className="justify-center flex flex-col-reverse md:flex-col">
        <div className="mb-8">
          <ControlPanel />
        </div>
      </div>
    </Layout>
  )
}

export default Home
