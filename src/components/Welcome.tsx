'use client'
import React from 'react'
import { motion } from "motion/react"
import { ArrowRight, ShoppingBasket } from "lucide-react"

const Welcome = ({nextStep}: {nextStep: () => void}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-linear-to-b from-green-50 to-white text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <ShoppingBasket size={48} className="text-green-500 mx-auto" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-2xl sm:text-3xl md:text-4xl font-semibold text-green-600 mb-2"
      >
        Welcome to Snapkart
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-base sm:text-lg text-green-700 mb-6 max-w-md"
      >
        Your one-stop shop for quick and easy grocery delivery.
      </motion.p>
      <motion.button
        onClick={nextStep}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="px-5 py-2 rounded-lg bg-green-500 text-white font-medium shadow hover:bg-green-600 transition"
      >
        
        Get Started
        <ArrowRight className="inline-block ml-2" />
      </motion.button>
    </div>
  )
}

export default Welcome