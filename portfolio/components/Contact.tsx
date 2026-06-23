'use client'
import { useEffect, useRef } from 'react'
import { profile } from '@/data/portfolio'

function useReveal(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 100))
      })
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section id="contact" ref={ref} style={{ padding: '100px 40px 60px', background: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative */}
      <div style={{
        position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)',
        fontFamily: 'var(--font-display)', fontSize: 320, fontWeight: 300,
        color: 'rgba(249,246,240,0.03)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>MD</div>

      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

          {/* Left */}
          <div>
            <div className="reveal" style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ display: 'block', width: 24, height: 1, background: 'var(--gold)' }} />
                07 — Contact
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 20 }}>
                함께 만들 수 있는<br />
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>매출이 있습니다.</em>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(249,246,240,0.6)', lineHeight: 1.85, fontWeight: 300 }}>
                채용 문의, 협업 제안, 이커머스 MD 관련 이야기라면<br />언제든지 편하게 연락주세요.
              </p>
            </div>

            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href={`mailto:${profile.email}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                padding: '16px 24px', background: 'var(--gold)',
                color: '#fff', fontWeight: 600, fontSize: 14,
                borderRadius: 2, textDecoration: 'none',
                transition: 'opacity 0.2s', width: 'fit-content',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                📧 {profile.email}
              </a>
              <a href={`tel:${profile.phone.replace(/-/g, '')}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                padding: '16px 24px',
                border: '1px solid rgba(249,246,240,0.2)',
                color: 'rgba(249,246,240,0.7)', fontSize: 14, fontFamily: 'var(--font-mono)',
                borderRadius: 2, textDecoration: 'none',
                transition: 'all 0.2s', width: 'fit-content',
              }}
              onMouseEnter={e => { (e.currentTarget.style.borderColor = 'var(--gold)'); (e.currentTarget.style.color = 'var(--gold)') }}
              onMouseLeave={e => { (e.currentTarget.style.borderColor = 'rgba(249,246,240,0.2)'); (e.currentTarget.style.color = 'rgba(249,246,240,0.7)') }}
              >
                📞 {profile.phone}
              </a>
            </div>
          </div>

          {/* Right: profile summary */}
          <div className="reveal" style={{
            border: '1px solid rgba(249,246,240,0.1)',
            borderRadius: 4, padding: 32,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 24 }}>Profile Summary</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { k: 'NAME', v: `${profile.name} (${profile.nameKo})` },
                { k: 'BIRTH', v: profile.birth },
                { k: 'TITLE', v: profile.title },
                { k: 'COMPANY', v: profile.company },
                { k: 'CHANNEL', v: '지그재그 · 에이블리' },
                { k: 'CAREER', v: '9년+ (2016~)' },
                { k: 'EDUCATION', v: '경희사이버대 재학중' },
              ].map((r, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: i < 6 ? '1px solid rgba(249,246,240,0.07)' : 'none',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', color: 'rgba(249,246,240,0.3)', textTransform: 'uppercase' }}>{r.k}</span>
                  <span style={{ fontSize: 13, color: 'rgba(249,246,240,0.7)' }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="reveal" style={{
          marginTop: 80, paddingTop: 24,
          borderTop: '1px solid rgba(249,246,240,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: 'var(--cream)' }}>
            신연철<span style={{ color: 'var(--gold)' }}>.</span>
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(249,246,240,0.3)', letterSpacing: '0.08em' }}>
            © 2025 Shin Yeon Cheol · Performance MD Portfolio · Built with Next.js
          </span>
        </div>
      </div>
    </section>
  )
}
