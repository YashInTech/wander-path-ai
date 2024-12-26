import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>WanderPathAI</h2>
      <Button>Sign Up</Button>
    </>
  )
}

export default App