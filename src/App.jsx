import { useEffect, useState } from 'react'

// Replace these before going live.
const CONTACT = {
  demoLink: 'mailto:[your email]?subject=Voicy%20demo',
  whatsapp: '[your WhatsApp number]', // digits only, e.g. 919876543210
  email: '[your email]',
  sampleCallSrc: '', // path to a real 30-60s call recording, e.g. /sample-call.mp3
}

const waLink = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`

const TRANSCRIPT = [
  {
    who: 'ai',
    hi: 'नमस्ते रमेश जी, मैं शर्मा ट्रेडर्स की AI असिस्टेंट बोल रही हूँ। यह कॉल रिकॉर्ड हो रही है।',
    en: 'Hello Ramesh ji, this is the AI assistant from Sharma Traders. This call is being recorded.',
  },
  {
    who: 'ai',
    hi: 'आपका ₹4,500 का भुगतान बाकी है। क्या आप बता सकते हैं कब तक हो पाएगा?',
    en: 'Your payment of ₹4,500 is pending. Could you tell me when you can pay?',
  },
  {
    who: 'customer',
    hi: 'इस हफ़्ते थोड़ी दिक्कत है, 15 तारीख़ तक कर दूँगा।',
    en: "It's a bit tight this week. I'll pay by the 15th.",
  },
  {
    who: 'ai',
    hi: 'ठीक है, मैंने 15 तारीख़ नोट कर ली है। उस दिन आपको याद दिला दूँगी। धन्यवाद!',
    en: "Okay, I've noted the 15th. I'll remind you that day. Thank you!",
  },
]

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Voicy home">
      <span className="logo-mark" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      Voicy
    </a>
  )
}

function Icon({ name }) {
  const paths = {
    phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
    voice: 'M12 3v18M8 7v10M4 10v4M16 7v10M20 10v4',
    note: 'M6 3h9l4 4v14H6zM14 3v5h5M9 12h7M9 16h5',
    calendar: 'M4 6h16v14H4zM4 10h16M9 3v5M15 3v5',
    inbound: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2M15 3l-4 4M11 3v4h4',
    play: 'M8 5v14l11-7z',
    text: 'M4 6h16M4 12h16M4 18h10',
    live: 'M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4',
    test: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3',
    lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',
    handoff: 'M8 7a3 3 0 1 0 0 .01M16 7a3 3 0 1 0 0 .01M3 20a5 5 0 0 1 10 0M11 20a5 5 0 0 1 10 0',
    clock: 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 7v5l3 2',
    chat: 'M4 5h16v11H9l-5 4z',
    check: 'M5 12l4 4 10-10',
    arrow: 'M5 12h14M13 6l6 6-6 6',
    sun: 'M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
    moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z',
    whatsapp: 'M4 20l1.4-4A8 8 0 1 1 8 18.6zM9 9c0 3 3 6 6 6l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z',
  }
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('voicy-theme', theme)
    } catch {
      // storage blocked: theme still applies for this visit
    }
  }, [theme])

  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  )
}

function Waveform({ active }) {
  return (
    <div className={`wave ${active ? 'is-active' : ''}`} aria-hidden="true">
      {Array.from({ length: 28 }).map((_, i) => (
        <span key={i} style={{ animationDelay: `${(i % 7) * 0.09}s` }} />
      ))}
    </div>
  )
}

function CallCard() {
  const [step, setStep] = useState(1)
  const done = step > TRANSCRIPT.length

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setStep(TRANSCRIPT.length + 1)
      return
    }
    const delay = done ? 5200 : 2300
    const t = setTimeout(() => setStep(done ? 1 : step + 1), delay)
    return () => clearTimeout(t)
  }, [step, done])

  const speaking = !done && step > 0 ? TRANSCRIPT[step - 1].who : null

  return (
    <div className="call-card" aria-label="Example call between Voicy and a customer">
      <div className="call-head">
        <div className="call-who">
          <span className="avatar">RK</span>
          <div>
            <strong>Ramesh Kumar</strong>
            <span className="muted">Payment reminder · Hindi</span>
          </div>
        </div>
        <span className="pill pill-live"><i /> Example call</span>
      </div>

      <Waveform active={speaking === 'ai'} />

      <ol className="transcript">
        {TRANSCRIPT.slice(0, Math.min(step, TRANSCRIPT.length)).map((line, i) => (
          <li key={i} className={`bubble bubble-${line.who}`}>
            <span className="bubble-label">{line.who === 'ai' ? 'Voicy' : 'Customer'}</span>
            <p lang="hi" className="hi">{line.hi}</p>
            <p className="en">{line.en}</p>
          </li>
        ))}
      </ol>

      <div className={`captured ${done ? 'is-shown' : ''}`}>
        <Icon name="check" />
        <div>
          <strong>Promise to pay saved</strong>
          <span>₹4,500 · by 15 Oct · reminder scheduled</span>
        </div>
      </div>
    </div>
  )
}

function Section({ id, eyebrow, title, intro, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">
        <header className="section-head">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
          {intro && <p className="lead">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}

const PROBLEMS = [
  'Your team spends hours every day making the same calls.',
  "Customers don't pick up, and nobody has time to call them back.",
  "You can't be sure what was said on a call, or what a customer promised.",
  'Hiring and training more callers is slow and expensive.',
]

const FEATURES = [
  {
    icon: 'phone',
    title: 'It calls your customers',
    body: "Give Voicy your list. It calls everyone, and tries again later if someone doesn't pick up.",
    wide: true,
  },
  {
    icon: 'voice',
    title: 'It talks like a person',
    body: 'It speaks naturally in Hindi, English and regional languages, listens to the customer, and replies to what they actually said.',
  },
  {
    icon: 'note',
    title: 'It remembers everything',
    body: 'If a customer says "I\'ll pay on the 15th", Voicy notes it down and shows it on your dashboard.',
  },
  {
    icon: 'calendar',
    title: 'It books appointments',
    body: "It offers the customer available times and books one while they're still on the call.",
  },
  {
    icon: 'inbound',
    title: 'It answers your phone too',
    body: 'When customers call you, Voicy picks up straight away, even at night.',
  },
]

const USES = [
  { title: 'Collecting payments', body: 'A polite reminder, the reason for the delay, and a promised payment date.' },
  { title: 'Booking appointments', body: 'For clinics, salons, service centres and the like.' },
  { title: 'Reminders', body: 'Renewals, deliveries and upcoming appointments.' },
  { title: 'Answering common questions', body: 'Timings, prices and how to pay.' },
]

const CONTROL = [
  { icon: 'play', title: 'Listen to any call', body: 'Every call is recorded, and the customer is told so.' },
  { icon: 'text', title: 'Read every conversation', body: 'Each call is written down as text.' },
  { icon: 'live', title: 'Watch calls live', body: 'See conversations as they happen.' },
  { icon: 'test', title: 'Try it first', body: 'Talk to your assistant before it calls a single customer, and change anything you don’t like.' },
  { icon: 'handoff', title: 'A person when needed', body: '[Confirm: if a customer asks for a person or gets upset, Voicy flags the call for your team to follow up.]' },
  { icon: 'clock', title: 'Polite, at the right time', body: 'It calls only during the hours you set, and it always says it is an AI assistant.' },
]

const STEPS = [
  { title: 'Tell us what you need', body: 'For example, “remind customers about pending payments”.' },
  { title: 'We build your assistant', body: 'We write the script and set everything up for you.' },
  { title: 'You test it', body: 'Talk to it yourself. We adjust it until you’re happy.' },
  { title: 'It starts calling', body: 'You see the results on your dashboard every day.' },
]

const WHY = [
  'Calls your whole list without getting tired',
  'Speaks your customers’ language, not just Hindi',
  'Never forgets to follow up',
  'Every call is recorded and written down',
]

const FAQ = [
  {
    q: 'Will my customers know they are talking to an AI?',
    a: 'Yes. Voicy introduces itself as an AI assistant from your business at the start of every call. Being upfront builds trust.',
  },
  {
    q: 'Which languages does it speak?',
    a: 'Hindi, English and regional Indian languages. It also handles customers who mix languages, like Hinglish. Tell us which languages your customers speak and we’ll set it up.',
  },
  {
    q: 'What if a customer gets angry or wants to talk to a person?',
    a: '[Confirm: Voicy stays polite, ends the call gracefully and flags it so someone from your team can call back.]',
  },
  {
    q: 'How long does setup take?',
    a: '[Add your real timeline, e.g. “Most businesses are ready to test within a few days.”]',
  },
  {
    q: 'How much does it cost?',
    a: 'It depends on how many calls you need. Talk to us and we’ll give you a clear price for your business.',
  },
]

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-inner">
          <Logo />
          <div className="nav-links">
            <a href="#features">Product</a>
            <a href="#uses">Use cases</a>
            <a href="#how">How it works</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-actions">
            <ThemeToggle />
            <a className="btn btn-primary btn-sm" href={CONTACT.demoLink}>Book a demo</a>
          </div>
        </div>
      </nav>

      <header id="top" className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">AI calling assistant · Speaks Indian languages</span>
            <h1>
              It calls your customers <em>in their language</em>, so your team doesn’t have to.
            </h1>
            <p className="lead">
              Voicy reminds customers about payments, books their appointments and answers their
              questions in a natural voice. It writes down what every customer said, so nothing
              gets missed.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href={CONTACT.demoLink}>
                Book a free demo <Icon name="arrow" />
              </a>
              {CONTACT.sampleCallSrc ? (
                <a className="btn btn-ghost" href={CONTACT.sampleCallSrc}>
                  <Icon name="play" /> Listen to a real call
                </a>
              ) : (
                <a className="btn btn-ghost" href="#features">
                  <Icon name="play" /> See how it works
                </a>
              )}
            </div>
            {CONTACT.sampleCallSrc && (
              <audio className="sample-audio" controls preload="none" src={CONTACT.sampleCallSrc} />
            )}
            <ul className="hero-ticks">
              <li><Icon name="check" /> Set up for you</li>
              <li><Icon name="check" /> Test before going live</li>
              <li><Icon name="check" /> Every call recorded</li>
            </ul>
          </div>
          <div className="hero-visual">
            <CallCard />
            <div className="float-chip float-chip-a" aria-hidden="true">
              <span className="icon-chip"><Icon name="voice" /></span>
              <div><strong>Speaks their language</strong><span>Hindi, English &amp; regional</span></div>
            </div>
            <div className="float-chip float-chip-b" aria-hidden="true">
              <span className="icon-chip"><Icon name="clock" /></span>
              <div><strong>No answer?</strong><span>Calls back later</span></div>
            </div>
          </div>
        </div>
      </header>

      <Section
        id="problems"
        eyebrow="Sound familiar?"
        title="Calling customers eats up your team’s day."
      >
        <div className="problem-grid">
          {PROBLEMS.map((p, i) => (
            <div className="problem" key={i}>
              <span className="problem-num">0{i + 1}</span>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="features"
        eyebrow="Voicy takes care of it"
        title="One assistant that handles your calls from start to finish."
      >
        <div className="bento">
          {FEATURES.map((f) => (
            <article key={f.title} className={`card feature ${f.wide ? 'is-wide' : ''}`}>
              <span className="icon-chip"><Icon name={f.icon} /></span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="uses"
        eyebrow="Use cases"
        title="What businesses use it for."
        intro="Clinics, lenders, distributors, salons, service centres: any business that makes the same calls every day."
      >
        <div className="uses">
          {USES.map((u) => (
            <div className="use" key={u.title}>
              <h3>{u.title}</h3>
              <p>{u.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="section">
        <div className="container">
          <div className="soon">
            <div>
              <span className="pill">Coming soon</span>
              <h2>Calls today. Chat soon.</h2>
              <p className="lead">
                The same assistant that talks to your customers on the phone will soon chat with
                them too. One assistant that knows your business, wherever your customers reach you.
              </p>
              <a className="btn btn-ghost" href={`mailto:${CONTACT.email}?subject=Voicy%20chat%20early%20access`}>
                Join the early access list <Icon name="arrow" />
              </a>
            </div>
            <ul className="channels">
              <li><Icon name="whatsapp" /> WhatsApp</li>
              <li><Icon name="chat" /> Telegram</li>
              <li><Icon name="text" /> Chat on your website</li>
              <li className="is-live"><Icon name="phone" /> Phone calls <span>Live now</span></li>
            </ul>
          </div>
        </div>
      </section>

      <Section
        id="control"
        eyebrow="You’re always in control"
        title="See and hear everything Voicy does."
      >
        <div className="control-grid">
          {CONTROL.map((c) => (
            <div className="control" key={c.title}>
              <span className="icon-chip"><Icon name={c.icon} /></span>
              <div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="data" className="section-tight">
        <div className="data-card">
          <span className="icon-chip icon-chip-lg"><Icon name="lock" /></span>
          <div>
            <h2>How we protect your customers’ data</h2>
            <p className="lead">
              Your customers’ details are kept private and separate from every other business, and
              are never used for anyone else. Only the people you invite can see them.
            </p>
            <p className="muted small">
              [Add specifics: where data is stored, how long recordings are kept, and how to request deletion.]
            </p>
          </div>
        </div>
      </Section>

      <Section id="how" eyebrow="Getting started" title="Live in four simple steps.">
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step-num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="why" eyebrow="Why Voicy" title="A calling team that never takes a day off.">
        <ul className="why">
          {WHY.map((w) => (
            <li key={w}><Icon name="check" /> {w}</li>
          ))}
        </ul>
      </Section>

      <Section id="faq" eyebrow="Questions" title="Things owners usually ask.">
        <div className="faq">
          {FAQ.map((f, i) => {
            const open = openFaq === i
            return (
              <div className={`faq-item ${open ? 'is-open' : ''}`} key={f.q}>
                <button
                  className="faq-q"
                  aria-expanded={open}
                  onClick={() => setOpenFaq(open ? -1 : i)}
                >
                  {f.q}
                  <span className="faq-plus" aria-hidden="true" />
                </button>
                <div className="faq-a"><div><p>{f.a}</p></div></div>
              </div>
            )
          })}
        </div>
      </Section>

      <section className="section">
        <div className="container">
          <div className="final-cta">
            <div className="hero-glow" aria-hidden="true" />
            <h2>Let Voicy make your calls, so your team can focus on what matters.</h2>
            <div className="cta-row cta-center">
              <a className="btn btn-primary" href={CONTACT.demoLink}>
                Book a free demo <Icon name="arrow" />
              </a>
              <a className="btn btn-ghost" href={waLink} target="_blank" rel="noreferrer">
                <Icon name="whatsapp" /> Chat on WhatsApp
              </a>
            </div>
            <p className="muted">
              Or email us at <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo />
          <span className="muted small">© {new Date().getFullYear()} Voicy. All rights reserved.</span>
        </div>
      </footer>

      <a className="wa-float" href={waLink} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
        <Icon name="whatsapp" />
      </a>
    </>
  )
}
