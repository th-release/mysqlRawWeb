import type { NextApiRequest, NextApiResponse } from 'next'
import knex from 'knex'

export default async function rawCommand(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { host, username, password, database, sql } = JSON.parse(req.body)
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

  const result = await db.raw(sql)
  .catch((e) => {
    return res.send({
      status: false,
      msg: e
    })
  })
  if (result) {
    return res.send({
      status: true,
      msg: JSON.stringify(result)
    })
  }
}
