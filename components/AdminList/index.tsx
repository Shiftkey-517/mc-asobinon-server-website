import { TwitterUser } from '../../models/TwitterUser'
import { Admin } from './admin'

export const AdminList: React.FC<{ admins: TwitterUser[] }> = ({ admins }) => {
  return (
    <div className="p-4 md:p-6 bg-gray-200 rounded-xl">
      <h2 className="mb-4 text-xl font-bold">操作できる人一覧</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {admins.map((admin, n) => (
          <Admin key={n} admin={admin} />
        ))}
      </div>
    </div>
  )
}
