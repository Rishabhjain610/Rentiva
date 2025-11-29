'use client'
import React, { useState } from 'react'
import { motion } from "motion/react"
import { Mail, Lock, LogIn, Eye, EyeOff,Loader2,ArrowLeft } from "lucide-react"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { signIn } from 'next-auth/react'
const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const handleLogin=async(e:React.FormEvent)=>{
    e.preventDefault();
    setLoading(true)
    try {
      await signIn('credentials',{redirect:false,email,password})
      
    } catch (error) {
      console.error('Login error:', error)
      setLoading(false)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-green-50 via-white to-green-100">
      <motion.button
        type="button"
        onClick={() => router.back()}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-6 left-6 flex items-center gap-2 py-2 px-4 rounded-md border border-green-200 bg-white/80 text-green-600 hover:bg-green-100 shadow transition"
      >
        <ArrowLeft size={18} />
        Back
      </motion.button>
      <motion.form
        initial={{ opacity: 0, scale: 0.97, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-white/90 p-8 rounded-xl shadow-xl space-y-6 border border-green-100"
      >
        <div className="flex flex-col items-center mb-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-green-100 rounded-full p-3 mb-2"
          >
            <LogIn size={32} className="text-green-600" />
          </motion.div>
          <h2 className="text-3xl font-bold text-center text-green-600 tracking-tight">Login</h2>
        </div>
        <button
          type="button"
          className="flex items-center justify-center w-full border border-gray-300 rounded-md py-2 mb-2 bg-white hover:bg-gray-50 transition font-medium shadow-sm"
        >
          <svg className="mr-2" width="22" height="22" viewBox="0 0 48 48"><g><circle cx="24" cy="24" r="20" fill="#fff"/><path d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.2-7.7 20.8-17.5.1-.5.2-1 .2-1.5 0-1.3-.1-2.6-.3-3.8z" fill="#fbbc05"/><path d="M6.3 14.7l7 5.1C15.7 16.1 19.5 13 24 13c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.6 5.1 29.6 3 24 3c-7.2 0-13 5.8-13 13 0 2.3.6 4.5 1.7 6.4z" fill="#ea4335"/><path d="M24 44c5.6 0 10.6-1.9 14.5-5.1l-6.7-5.5C29.8 37 24 37 24 37c-5.8 0-10.7-3.1-13.7-7.5l-7 5.1C7.4 41.6 15.1 44 24 44z" fill="#34a853"/><path d="M44.5 20H24v8.5h11.7c-2 4.1-6.1 7-11.7 7-5.8 0-10.7-3.1-13.7-7.5l-7 5.1C7.4 41.6 15.1 44 24 44c10.5 0 19.2-7.7 20.8-17.5.1-.5.2-1 .2-1.5 0-1.3-.1-2.6-.3-3.8z" fill="#4285f4"/></g></svg>
          <span>Sign in with Google</span>
        </button>
        <div className="flex items-center my-2">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" size={18} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full pl-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 bg-green-50"
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" size={18} />
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full pl-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 bg-green-50"
            required
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400"
            tabIndex={-1}
          >
            {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition shadow flex items-center justify-center "
        >
          {loading ? <Loader2 className="mx-3 animate-spin"/> : <></>}
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-center text-sm text-gray-500 mt-2">
          Don't have an account?{' '}
          <p onClick={() => router.push('/register')} className="text-green-600 hover:underline font-medium cursor-pointer">Register</p>
        </p>
      </motion.form>
    </div>
  )
}

export default LoginForm