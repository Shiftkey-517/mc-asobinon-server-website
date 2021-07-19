import styles from '../styles/Home.module.scss'
import LoginButton from './LoginButton'

const Header: React.FC = () => {
  return (
    <header className="bg-gray-100 p-4">
      <h1 className={`text-center uppercase mb-3 ${styles.title}`}>
        アソビノンサーバー管理画面
      </h1>
      <nav>
        <LoginButton />
      </nav>
    </header>
  )
}

export default Header
