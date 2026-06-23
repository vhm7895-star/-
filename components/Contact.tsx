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
    <section id="contact" ref={ref} className="px-6 md:px-8 pt-16 pb-12 md:pt-24 md:pb-16" style={{ background: 'var(--bg-2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(240,165,0,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 32, alignItems: 'center' }}>
          <div className="reveal">
            <div className="section-label" style={{ marginBottom: 24 }}>
              <div>
                <div className="label" style={{ marginBottom: 6 }}>06 — GET IN TOUCH</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Contact</h2>
              </div>
            </div>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 40, maxWidth: 440, wordBreak: 'keep-all' }}>
              협업 제안, 채용 문의, 혹은 이커머스 MD 관련 이야기라면 언제든지 편하게 연락주세요.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href={`mailto:${profile.email}`} style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '16px 24px',
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
                { label: 'BRAND', value: '아뜨랑스' },
                { label: 'CHANNEL', value: '지그재그 · 에이블리' },
                { label: 'CAREER', value: '9년+ (2016~)' },
                { label: 'EDUCATION', value: '경희사이버대 재학중' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14, borderBottom: i < 5 ? '1px solid var(--border)' : 'none', marginBottom: i < 5 ? 14 : 0 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{item.label}</span>
                  <span style={{ fontFamily: 'var(--font-ko)', fontSize: 13, color: 'var(--text-secondary)', textAlign: 'right', marginLeft: 16, wordBreak: 'keep-all' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left" style={{ marginTop: 80, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: 'var(--text-muted)' }}>
            YC<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', wordBreak: 'keep-all' }}>
            © 2025 {profile.name} · Built with Next.js · Deployed on Vercel
          </span>
        </div>
      </div>
    </section>
  )
}
