import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [host, setHost] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [database, setDatabase] = useState<string>("");
  const [sql, setSql] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [result, setResult] = useState<string>("");

  const testConnect = async () => {
    event?.preventDefault();
    const res = await fetch("/api/test-connect", {
      method: "POST",
      body: JSON.stringify({
        host,
        username,
        password,
        database
      })
    }).then(res => res.json())
    setStatus(0);
    if (res.status) {
      setStatus(1);
      setResult(res.msg);
    } else {
      setStatus(2);
      setResult(res.msg);
    }
    return
  }

  const rawCommand = async () => {
    event?.preventDefault();
    const res = await fetch("/api/rawCommand", {
      method: "POST",
      body: JSON.stringify({
        host, username, password, database, sql
      })
    }).then(res => res.json())
    setStatus(0);
    if (res.status) {
      setStatus(1);
      setResult(res.msg);
    } else {
      setStatus(2);
      setResult(res.msg);
    }
  }

  return (
    <div style={{ margin: "20px" }}>
      <Head>
        <title>mysql-test-app</title>
        <meta name="description" content="나의 mysql에 직접 sql문을 써볼까요?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <hr/>
      <form onSubmit={testConnect}>
        <input name='host' placeholder='host' style={{ width: "200px", height: "30px" }} onChange={(e) => setHost(e.target.value)} /><br/>
        <input name='username' placeholder='username' style={{ width: "200px", height: "30px", marginTop: "5px" }} onChange={(e) => setUsername(e.target.value)} /><br/>
        <input name='password' type={"password"} placeholder='password' style={{ width: "200px", height: "30px", marginTop: "5px" }} onChange={(e) => setPassword(e.target.value)} /><br/>
        <input name='database' placeholder='database' style={{ width: "200px", height: "30px", marginTop: "5px" }} onChange={(e) => setDatabase(e.target.value)} /><br/>
        <input name='connect' value={"test-connect"} type={"submit"} style={{ width: "200px", height: "30px", marginTop: "5px" }} />
      </form>
      <hr/>
      <form onSubmit={rawCommand}>
        <textarea name='sql' style={{ width: "100%", height: "120px" }} onChange={(e) => setSql(e.target.value)} />
        <input name='fetch' value={"command"} type={"submit"} style={{ width: "100%", height: "40px", marginTop: "5px" }} />
      </form>
      <hr/>
      <h2>{status === 0 ? "요청 대기" : status === 1 ? "요청 성공" : "요청 실패"}</h2>
      <p className='result'>{result}</p>
    </div>
  )
}
