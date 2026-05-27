import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, BarChart3, BriefcaseBusiness, CalendarRange, LayoutPanelTop, Sparkles } from 'lucide-react'

const words = ['LAUNCH', 'ORGANIZE', 'GROW', 'SCALE']
const chips = ['Websites', 'Brand', 'Systems', 'Payments', 'Content', 'Growth']

export default function HeroScene() {
  const [active, setActive] = useState(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 120, damping: 14, mass: 0.2 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 14, mass: 0.2 })
  const rotateX = useTransform(springY, [-100, 100], [10, -10])
  const rotateY = useTransform(springX, [-100, 100], [-10, 10])
  const floatX = useTransform(springX, [-120, 120], [-22, 22])
  const floatY = useTransform(springY, [-120, 120], [-16, 16])

  useEffect(() => {
    const id = setInterval(() => setActive((current) => (current + 1) % words.length), 2600)
    return () => clearInterval(id)
  }, [])

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - rect.left - rect.width / 2)
    mouseY.set(event.clientY - rect.top - rect.height / 2)
  }

  const reset = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div className="hero-scene" onMouseMove={handleMove} onMouseLeave={reset}>
      <div className="scene-grid" />
      <div className="word-stage">
        {words.map((word, index) => (
          <motion.span
            key={word}
            className={`word-layer ${index === active ? 'active' : ''}`}
            initial={false}
            animate={{
              y: index === active ? 0 : 28,
              opacity: index === active ? 1 : 0,
              filter: index === active ? 'blur(0px)' : 'blur(10px)',
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      <motion.div className="orbital-device" style={{ rotateX, rotateY }}>
        <div className="orb-halo halo-a" />
        <div className="orb-halo halo-b" />
        <div className="orb-ring ring-a" />
        <div className="orb-ring ring-b" />
        <motion.div className="device-browser" style={{ x: floatX, y: floatY }}>
          <div className="browser-topbar">
            <span />
            <span />
            <span />
          </div>
          <div className="browser-body">
            <div className="body-copy">
              <p className="body-kicker">WYLO // DIGITAL INFRASTRUCTURE</p>
              <h3>We engineer the business layer behind the brand.</h3>
              <div className="signal-row">
                <div>
                  <small>Site Systems</small>
                  <strong>98%</strong>
                </div>
                <div>
                  <small>Launch Velocity</small>
                  <strong>4.2x</strong>
                </div>
                <div>
                  <small>Client Flow</small>
                  <strong>Synced</strong>
                </div>
              </div>
            </div>
            <div className="body-panel">
              <div className="mini-card analytics">
                <BarChart3 size={16} />
                <div>
                  <strong>Growth Engine</strong>
                  <small>Campaigns, content, conversion routing</small>
                </div>
              </div>
              <div className="mini-chart">
                <span className="bar one" />
                <span className="bar two" />
                <span className="bar three" />
                <span className="bar four" />
                <span className="bar five" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="floating-card card-a" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <LayoutPanelTop size={17} />
          <div>
            <strong>Website Layer</strong>
            <small>High-converting landing systems</small>
          </div>
        </motion.div>

        <motion.div className="floating-card card-b" animate={{ y: [0, 8, 0], x: [0, -6, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}>
          <CalendarRange size={17} />
          <div>
            <strong>Ops Layer</strong>
            <small>CRM, bookings, automations</small>
          </div>
        </motion.div>

        <motion.div className="floating-card card-c" animate={{ y: [0, -8, 0], x: [0, 8, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}>
          <BriefcaseBusiness size={17} />
          <div>
            <strong>Brand Layer</strong>
            <small>Offer clarity, visuals, authority</small>
          </div>
        </motion.div>

        <motion.div className="floating-card card-d" animate={{ y: [0, 12, 0] }} transition={{ duration: 5.1, repeat: Infinity, ease: 'easeInOut' }}>
          <Sparkles size={17} />
          <div>
            <strong>Signal</strong>
            <small>Premium aesthetic, frontier motion</small>
          </div>
        </motion.div>

        <motion.div className="floating-badge badge-a" style={{ x: floatX }}>
          <span>Blueprint → Build → Scale</span>
          <ArrowUpRight size={14} />
        </motion.div>
      </motion.div>

      <div className="chip-constellation">
        {chips.map((chip, index) => (
          <motion.span
            key={chip}
            className="chip"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + index * 0.08, duration: 0.5 }}
          >
            {chip}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
