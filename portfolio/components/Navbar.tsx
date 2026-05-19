'use client'
import { useState, useEffect } from 'react'

const NAV = [
  { label: 'About', href: '#hero' },
  { label: '성과', href: '#kpi' },
  { label: '프로젝트', href: '#projects' },
  { label: '역량', href: '#skills' },
  { label: '경력', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [prog, setProg] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY
      const dh = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(st > 50)
      setProg(Math.min((st / dh) * 100, 100))
      const ids = NAV.map(n => n.href.slice(1))
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && st >= el.offsetTop - 140) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div id="prog" style={{ width: `${prog}%` }} />
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? 'rgba(249,246,240,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,24,20,0.08)' : 'none',
        transition: 'all 0.4s ease',
        padding: scrolled ? '14px 40px' : '24px 40px',
      }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#hero" style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: 'var(--ink)', textDecoration: 'none', letterSpacing: '-0.01em' }}>
            신연철<span style={{ color: 'var(--gold)' }}>.</span>
          </a>
          <ul style={{ display: 'flex', gap: 36, listStyle: 'none' }}>
            {NAV.map(item => (
              <li key={item.href}>
                <a href={item.href} className={`nav-link${active === item.href.slice(1) ? ' active' : ''}`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="mailto:vhm7895@naver.com" className="btn-primary" style={{ padding: '10px 20px', fontSize: 12 }}>
            연락하기
          </a>
        </div>
      </nav>
    </>
  )
}
