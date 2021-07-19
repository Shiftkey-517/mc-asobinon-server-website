import { useAuthentication } from '../hooks/authentication'

const ControlPanel: React.FC = () => {
  const { user } = useAuthentication()
  return (
    <div className="p-3">
      {user ? (
        <>
          <pre>{JSON.stringify(user, null, '\t')}</pre>
        </>
      ) : (
        <>あなたは操作できません</>
      )}
    </div>
  )
}

export default ControlPanel
