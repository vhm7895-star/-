'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [menuOpen, setMenuOpen] = useState(false)

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

  // Close mobile menu on clicking links or resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  return (
    <>
      <div id="progress-bar" style={{ width: `${progress}%` }} />
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled || menuOpen ? 'rgba(10,10,15,0.92)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
        padding: scrolled ? '14px 24px' : '24px 24px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#about" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--text-primary)', textDecoration: 'none', letterSpacing: '-0.02em' }}>
            YC<span style={{ color: 'var(--accent)' }}>.</span>
          </a>

          {/* Desktop Nav Items */}
          <ul className="hidden md:flex" style={{ gap: 32, listStyle: 'none', alignItems: 'center' }}>
            {navItems.map(item => (
              <li key={item.href}>
                <a href={item.href} className={`nav-link${active === item.href.slice(1) ? ' active' : ''}`}>{item.label}</a>
              </li>
            ))}
          </ul>

          {/* Desktop Contact button */}
          <a href="mailto:vhm7895@naver.com" className="hidden md:inline-flex" style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
            padding: '8px 18px', border: '1px solid rgba(240,165,0,0.3)',
            borderRadius: 999, color: 'var(--accent)', textDecoration: 'none', transition: 'all 0.2s',
          }}>CONTACT</a>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden"
            style={{
              background: 'none', border: 'none', color: 'var(--text-primary)',
              cursor: 'pointer', zIndex: 600, padding: 4
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Glassmorphism Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(10,10,15,0.96)',
              backdropFilter: 'blur(30px)',
              zIndex: 499,
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              padding: '120px 24px 60px'
            }}
          >
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 28, listStyle: 'none', alignItems: 'center', width: '100%' }}>
              {navItems.map((item, idx) => (
                <motion.li 
                  key={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                >
                  <a 
                    href={item.href} 
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700,
                      letterSpacing: '0.04em', color: active === item.href.slice(1) ? 'var(--accent)' : 'var(--text-primary)',
                      textDecoration: 'none', transition: 'color 0.2s'
                    }}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.05 + 0.1 }}
              style={{ marginTop: 48 }}
            >
              <a 
                href="mailto:vhm7895@naver.com" 
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 36px', background: 'var(--accent)', color: '#000',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
                  letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: 8, textDecoration: 'none',
                }}
              >
                CONTACT ME
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
