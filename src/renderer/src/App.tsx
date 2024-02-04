import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './public/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [port, setPort] = useState("");

  useEffect(() => {
    const exec = async () => {
      let newPort: string = "";
      while(!newPort){
        newPort = await window.electronAPI.getPort();
      }
      setPort(newPort)
    }
    exec();

  })

  console.log("Render run")

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Bakso Tanpa Tepung + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>Port {port}</p>
    </>
  )
}

export default App
