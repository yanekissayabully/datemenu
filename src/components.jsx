import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  Check, ForkKnife, BowlFood, Heart, PottedPlant, Hamburger, Wine,
} from '@phosphor-icons/react'

const BASE = import.meta.env.BASE_URL

// Blur-in по словам, в духе React Bits "BlurText"
export function BlurText({ text, className, delay = 0.08 }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          initial={reduce ? false : { opacity: 0, filter: 'blur(12px)', y: 18 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.7, delay: i * delay, ease: [0.16, 1, 0.3, 1] }}
        >
          {word + (i < words.length - 1 ? ' ' : '')}
        </motion.span>
      ))}
    </span>
  )
}

const hearts = [
  { l: 6, s: 22, d: 16, o: 0 }, { l: 16, s: 14, d: 21, o: 5 },
  { l: 27, s: 28, d: 19, o: 2 }, { l: 38, s: 16, d: 24, o: 9 },
  { l: 49, s: 24, d: 17, o: 4 }, { l: 58, s: 12, d: 22, o: 11 },
  { l: 68, s: 26, d: 20, o: 1 }, { l: 78, s: 18, d: 23, o: 7 },
  { l: 88, s: 24, d: 18, o: 3 }, { l: 95, s: 14, d: 25, o: 10 },
]

export function FloatingHearts() {
  return (
    <div className="hearts" aria-hidden="true">
      {hearts.map((h, i) => (
        <Heart
          key={i}
          weight="fill"
          size={h.s}
          style={{ left: `${h.l}%`, animationDuration: `${h.d}s`, animationDelay: `-${h.o}s` }}
        />
      ))}
    </div>
  )
}

export function Reveal({ children, className }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Photo({ file, alt, fallbackIcon = 'steak', className }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`photo-fallback ${className || ''}`} role="img" aria-label={alt}>
        {fallbackIcon === 'heart' ? <Heart weight="fill" size={64} /> : <ForkKnife weight="duotone" size={52} />}
      </div>
    )
  }
  return (
    <img
      className={className}
      src={`${BASE}photos/${file}`}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

const sideIcons = { fries: Hamburger, potato: PottedPlant, bowl: BowlFood, veg: PottedPlant }

// Карточка выбора (radio). Нативный input даёт клавиатуру и доступность.
export function Choice({ name, value, checked, onChange, children, className }) {
  return (
    <label className={`choice ${checked ? 'is-checked' : ''} ${className || ''}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
      {children}
      <span className="tick" aria-hidden="true"><Check weight="bold" size={14} /></span>
    </label>
  )
}

export function SideIcon({ type }) {
  const Icon = sideIcons[type] || BowlFood
  return <Icon weight="duotone" size={28} />
}

export function DrinkIcon() {
  return <Wine weight="duotone" size={22} />
}
