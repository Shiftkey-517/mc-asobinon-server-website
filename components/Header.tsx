import Link from './ActiveLink'
import LoginButton from './LoginButton'

const Header: React.FC = () => {
  return (
    <header className="bg-gray-100 p-4">
      <nav>
        <LoginButton />
      </nav>
    </header>
  )
}

export default Header
