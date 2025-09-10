import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate=useNavigate()
  return (
    <div>
      hello
      <button onClick={()=>navigate('/signin')}>Get started</button>
    </div>
  )
}

export default Landing
