import React, { useEffect, useState } from 'react'
import auth from '../config/Firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toast'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) navigate('/dashboard')
    })
  }, [navigate])

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/dashboard')
      toast.success("Login Successfull")
    } catch (error) {
      setError("Invalid Email or Password")
      toast.error("Login Failed")
    }
  }

  return (
    <div className='bg-purple-400 w-screen h-screen flex justify-center items-center'>
      <div className='bg-white border rounded-md py-5 px-8 md:px-16 lg:px-32'>
        <h1 className='text-center text-lg md:text-2xl'>Login</h1>
        <div className='flex flex-col gap-2 mt-5'>
          <input onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Enter Your Email' className='px-4 py-1.5 
            outline-none rounded-lg border border-black'/>
          <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter Your Password' className='px-4 py-1.5 
            outline-none rounded-lg border border-black'/>
        </div>
        <p onClick={() => navigate('/signup')} className='text-gray-400 mt-2 cursor-pointer'>New user ? please signup</p>
        <button onClick={handleSubmit} className='bg-violet-600 text-white w-full py-1.5 px-5 mt-3 rounded-lg cursor-pointer'>
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
