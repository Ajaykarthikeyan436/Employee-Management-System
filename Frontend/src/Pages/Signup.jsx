import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import auth from '../config/Firebase'
import { toast } from 'react-toast'

const Signup = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) navigate('/dashboard')
    })
  }, [navigate])

  const handleSignup = async () => {

    if (password !== confirmPassword) {
      setError("Password didn't Match")
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/')
      toast.success("User Registered")
    } catch (error) {
      toast.error("User Already exist")
      console.log(error)
    }
  }

  return (
    <div className='bg-purple-400 w-screen h-screen flex justify-center items-center'>
      <div className='bg-white border rounded-md py-5 px-8 md:px-16 lg:px-32'>
        <h1 className='text-center text-lg md:text-2xl'>Signup</h1>
        <div className='flex flex-col gap-2 mt-5'>
          <input onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Enter Your Email' className='px-4 py-1.5 
            outline-none rounded-lg border border-black'/>
          <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter Your Password' className='px-4 py-1.5 
            outline-none rounded-lg border border-black'/>
          <input onChange={(e) => setConfirmPassword(e.target.value)} type='password' placeholder='Enter Your Password' className='px-4 py-1.5 
            outline-none rounded-lg border border-black'/>
        </div>
        <p onClick={() => navigate('/')} className='text-gray-400 mt-2 cursor-pointer'>Already an user ? login</p>
        <button onClick={handleSignup} className='bg-violet-600 text-white w-full py-1.5 px-5 mt-3 rounded-lg cursor-pointer'>
          Signup
        </button>
      </div>
    </div>
  )
}

export default Signup
