'use client'
import { useEffect, useRef } from 'react'
import { profile } from '@/data/portfolio'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 120)) })
    }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" ref={ref} style={{ padding: '100px 32px 60px', background: 'var(--bg-2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(240,165,0,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center' }}>
          <div className="reveal">
            <div className="section-label" style={{ marginBottom: 24 }}>
              <div>
                <div className="label" style={{ marginBottom: 6 }}>06 — GET IN TOUCH</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Contact</h2>
              </div>
            </div>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 40, maxWidth: 440 }}>
              협업 제안, 채용 문의, 혹은 이커머스 MD 관련 이야기라면 언제든지 편하게 연락주세요.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href={`mailto:${profile.email}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 24px',
                background: 'var(--accent)', color: '#000', fontFamily: 'var(--font-display)',
                fontWeight: 700, fontSize: 14, borderRadius: 10, textDecoration: 'none', width: 'fit-content',
              }}>📧 {profile.email}</a>
            </div>
          </div>

          <div className="reveal card" style={{ padding: '32px' }}>
            <div className="label" style={{ marginBottom: 20 }}>PROFILE SUMMARY</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { label: 'NAME', value: `${profile.name} (${profile.nameKo})` },
                { label: 'BIRTH', value: profile.birth },
                { label: 'CAREER', value: '5년' },
                { label: 'EDUCATION', value: '목포과학대 식품영양학과' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14, borderBottom: i < 3 ? '1px solid var(--border)' : 'none', marginBottom: i < 3 ? 14 : 0 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{item.label}</span>
                  <span style={{ fontFamily: 'var(--font-ko)', fontSize: 13, color: 'var(--text-secondary)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal" style={{ marginTop: 80, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: 'var(--text-muted)' }}>
            SM<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
            © 2025 {profile.name} · Built with Next.js · Deployed on Vercel
          </span>
        </div>
      </div>
    </section>
  )
}
