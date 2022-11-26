import type { NextApiRequest, NextApiResponse } from 'next'
import knex from 'knex'

export default async function testConnect(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { host, username, password, database } = JSON.parse(req.body)
  const db = knex({
    client: 'mysql',
    connection: {
      host,
      port: 3306,
      user: username,
      password,
      database
    }
  })

  await db.raw("select 1")
  .then(() => {
    return res.send({
      status: true,
      msg: "성공적으로 데이터베이스 연결에 성공했습니다."
    })
  })
  .catch((e) => {
    return res.send({
      status: false,
      msg: "데이터베이스 연결에 실패 했습니다."
    })
  })
}
