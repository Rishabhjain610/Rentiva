'use client'
import React, { useState } from 'react'
import Welcome from '@/components/Welcome'
import RegisterForm from '@/components/RegisterForm'

const Register = () => {
  const [step, setStep] = useState(1)
  return (
    <div className="">
      {step === 1 && <Welcome nextStep={() => setStep(2)} />}
      {step === 2 && <RegisterForm onBack={()=>setStep(1)}/>}
    </div>
  )
}

export default Register