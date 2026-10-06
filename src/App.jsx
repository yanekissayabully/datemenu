import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { PaperPlaneTilt, Heart, ArrowDown, Leaf, CircleNotch, WarningCircle } from '@phosphor-icons/react'
import { steaks, doneness, sides, drinks } from './data.js'
import { sendToTelegram, telegramConfigured } from './telegram.js'
import { BlurText, FloatingHearts, Reveal, Photo, Choice, SideIcon, DrinkIcon } from './components.jsx'

const empty = { steak: null, doneness: null, side: null, drink: null }

export default function App() {
  const [pick, setPick] = useState(empty)
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const chosen = useMemo(() => ({
    steak: steaks.find((s) => s.id === pick.steak),
    doneness: doneness.find((s) => s.id === pick.doneness),
    side: sides.find((s) => s.id === pick.side),
    drink: drinks.find((s) => s.id === pick.drink),
  }), [pick])

  const done = Object.values(chosen).filter(Boolean).length
  const ready = done === 4
  const set = (key) => (e) => setPick((p) => ({ ...p, [key]: e.target.value }))

  async function submit() {
    if (!ready || status === 'sending') return
    setStatus('sending')
    try {
      await sendToTelegram({ ...chosen, comment })
      setStatus('sent')
      window.scrollTo({ top: 0 })
    } catch {
      setStatus('error')
    }
  }

  function reset() {
    setPick(empty)
    setComment('')
    setStatus('idle')
  }

  if (status === 'sent') {
    return (
      <main className="thanks">
        <FloatingHearts />
        <motion.div
          className="thanks-card"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        >
          <Heart weight="fill" size={72} className="thanks-heart" />
          <h1>Заказ отправлен!</h1>
          <p>Выбор уже прилетел в Telegram. Осталось дождаться ужина.</p>
          <ul className="receipt">
            <li><span>Стейк</span><b>{chosen.steak.name}</b></li>
            <li><span>Прожарка</span><b>{chosen.doneness.name}</b></li>
            <li><span>Гарнир</span><b>{chosen.side.name}</b></li>
            <li><span>Напиток</span><b>{chosen.drink.name}</b></li>
          </ul>
          <button className="btn btn-ghost" onClick={reset}>Выбрать заново</button>
        </motion.div>
      </main>
    )
  }

  return (
    <>
      <FloatingHearts />
      <main>
        <header className="hero">
          <div className="hero-copy">
            <h1>
              <BlurText text="DATEMENU" className="hero-title" />
              <BlurText text="special for Tomimimi" className="hero-sub" delay={0.12} />
            </h1>
            <p>Сегодня на ужин стейки. Выбери мясо, гарнир и напиток, а остальное я возьму на себя.</p>
            <a className="btn" href="#steak">
              Выбрать ужин <ArrowDown weight="bold" size={18} />
            </a>
          </div>
          <div className="hero-photo">
            <Photo file="hero.jpg" alt="Tomimimi и свидание" fallbackIcon="heart" />
          </div>
        </header>

        <Reveal className="section">
          <section id="steak" aria-labelledby="h-steak">
            <h2 id="h-steak">Выбери стейк</h2>
            <p className="lead">Все стейки из мраморной говядины. Прочитай описания и выбери свой.</p>
            <div className="steak-grid">
              {steaks.map((s) => (
                <Choice key={s.id} name="steak" value={s.id} checked={pick.steak === s.id} onChange={set('steak')} className="steak-card">
                  <Photo file={s.photo} alt={s.name} className="steak-img" />
                  <div className="steak-body">
                    <h3>{s.name}</h3>
                    <span className="meta">{s.meta}</span>
                    <p>{s.desc}</p>
                  </div>
                </Choice>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal className="section">
          <section aria-labelledby="h-done">
            <h2 id="h-done">Какая прожарка?</h2>
            <div className="seg" role="radiogroup" aria-labelledby="h-done">
              {doneness.map((d) => (
                <Choice key={d.id} name="doneness" value={d.id} checked={pick.doneness === d.id} onChange={set('doneness')} className="seg-item">
                  <b>{d.name}</b>
                  <span>{d.desc}</span>
                </Choice>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal className="section">
          <section aria-labelledby="h-side">
            <h2 id="h-side">Гарнир на выбор</h2>
            <div className="salad-note">
              <Leaf weight="duotone" size={26} />
              <p>Салат из листьев и свежих овощей уже входит в набор.</p>
            </div>
            <div className="side-grid" role="radiogroup" aria-labelledby="h-side">
              {sides.map((s) => (
                <Choice key={s.id} name="side" value={s.id} checked={pick.side === s.id} onChange={set('side')} className="side-card">
                  <SideIcon type={s.icon} />
                  <div>
                    <h3>{s.name}</h3>
                    <p>{s.desc}</p>
                  </div>
                </Choice>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal className="section">
          <section aria-labelledby="h-drink">
            <h2 id="h-drink">Что будем пить?</h2>
            <div className="drink-row" role="radiogroup" aria-labelledby="h-drink">
              {drinks.map((d) => (
                <Choice key={d.id} name="drink" value={d.id} checked={pick.drink === d.id} onChange={set('drink')} className="drink-chip">
                  <DrinkIcon />
                  {d.name}
                </Choice>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal className="section">
          <section aria-labelledby="h-note" className="note">
            <h2 id="h-note">Пожелания к ужину</h2>
            <label htmlFor="comment" className="field-label">Если хочешь что-то добавить (необязательно)</label>
            <textarea
              id="comment"
              rows={3}
              maxLength={300}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Например: без специй или с соусом"
            />
          </section>
        </Reveal>
      </main>

      <div className="dock" role="region" aria-label="Итог выбора">
        <div className="dock-inner">
          <div className="dock-info">
            <div className="dots" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => <span key={i} className={i < done ? 'on' : ''} />)}
            </div>
            <span className="dock-text">
              {ready ? `${chosen.steak.name}, ${chosen.side.name}, ${chosen.drink.name}` : `Выбрано ${done} из 4`}
            </span>
          </div>
          <button className="btn" disabled={!ready || status === 'sending'} onClick={submit}>
            {status === 'sending'
              ? <><CircleNotch size={18} className="spin" /> Отправляю</>
              : <><PaperPlaneTilt weight="fill" size={18} /> Отправить</>}
          </button>
        </div>
        <AnimatePresence>
          {status === 'error' && (
            <motion.p className="error" role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              <WarningCircle size={18} weight="fill" />
              {telegramConfigured ? 'Не получилось отправить. Попробуй ещё раз.' : 'Telegram пока не подключён. Сообщи об этом, пожалуйста.'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
