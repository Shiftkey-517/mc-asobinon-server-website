import { NodeSSH } from 'node-ssh'

export const connect = async (): Promise<void | NodeSSH> => {
  const ssh = new NodeSSH()
  const result = await ssh
    .connect({
      host: process.env.SSH_HOST,
      username: process.env.SSH_USERNAME,
      password: process.env.SSH_PASSWORD,
    })
    .catch((e) => {
      console.error(e)
    })
  return result
}
