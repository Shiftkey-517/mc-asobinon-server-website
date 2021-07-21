import { TwitterUser } from '../../models/TwitterUser'
import Image from 'next/image'
export const Admin: React.FC<{ admin: TwitterUser }> = ({ admin }) => {
  return (
    <div className="shadow-lg">
      <div
        style={{ background: `#${admin.profile_link_color}` }}
        className="h-32 overflow-hidden text-white p-3 rounded-t-xl"
      >
        <div className="flex align-top">
          <div>
            <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
              <Image
                width={48}
                height={48}
                src={admin.profile_image_url_https}
              />
            </div>
            <div>
              <b>{admin.name}</b>
              <pre className="text-gray-100">@{admin.screen_name}</pre>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 h-auto font-bold rounded-b-xl bg-white text-black">
        {admin.followers_count} Followers
      </div>
    </div>
  )
}
