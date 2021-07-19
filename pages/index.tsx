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
        <div className="md:mb-8">
          <iframe
            width="100%"
            height="600"
            src="https://mc.asobinon.org:8123"
          />
        </div>
        <div className="mb-8">
          <ControlPanel />
        </div>
      </div>
    </Layout>
  )
}

export default Home
