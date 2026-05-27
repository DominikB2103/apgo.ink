import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, href = '#', variant = 'primary' }) {
  const ref = useRef(null)

  const handleMove = (event) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    el.style.setProperty('--mx', `${x * 0.16}px`)
    el.style.setProperty('--my', `${y * 0.16}px`)
  }

  const reset = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--mx', '0px')
    el.style.setProperty('--my', '0px')
  }

  return (
    <motion.a
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      ref={ref}
      href={href}
      className={`magnetic-button ${variant}`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <span>{children}</span>
    </motion.a>
  )
}
