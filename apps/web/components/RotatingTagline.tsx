'use client'

import { AnimatePresence, motion ,useReducedMotion} from 'framer-motion'
import { useEffect, useState } from 'react'

const labels = ['Full-Stack Developer', 'Data Scientist', 'Manager']

export function RotatingTagline() {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => setIndex((i) => (i + 1) % labels.length), 2400)
    return () => clearInterval(t)
  }, [reduced])

   if (reduced) {
    return <span className="gradient-text font-bold">Full-Stack Developer</span>
  }
  
  return (
    <span className="relative inline-block min-w-[260px] text-text">
      <AnimatePresence mode="wait">
        <motion.span
          key={labels[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="inline-block gradient-text font-bold"
        >
          {labels[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}