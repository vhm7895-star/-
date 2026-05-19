'use client'
import { useState, useEffect } from 'react'

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EXP', href: '#experience' },
  { label: 'DATA', href: '#kpi' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scrollTop > 60)
      setProgress(Math.min((scrollTop / docH) * 100, 100))
      const ids = navItems.map(n => n.href.slice(1))
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div id="progress-bar" style={{ width: `${progress}%` }} />
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
        padding: scrolled ? '14px 32px' : '24px 32px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#about" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--text-primary)', textDecoration: 'none', letterSpacing: '-0.02em' }}>
            SM<span style={{ color: 'var(--accent)' }}>.</span>
          </a>
          <ul style={{ display: 'flex', gap: 32, listStyle: 'none' }}>
            {navItems.map(item => (
              <li key={item.href}>
                <a href={item.href} className={`nav-link${active === item.href.slice(1) ? ' active' : ''}`}>{item.label}</a>
              </li>
            ))}
          </ul>
          <a href="mailto:vhm7895@naver.com" style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
            padding: '8px 18px', border: '1px solid rgba(240,165,0,0.3)',
            borderRadius: 999, color: 'var(--accent)', textDecoration: 'none', transition: 'all 0.2s',
          }}>CONTACT</a>
        </div>
      </nav>
    </>
  )
}
