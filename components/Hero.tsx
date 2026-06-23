'use client'
import { useEffect, useRef, useState } from 'react'
import { profile } from '@/data/portfolio'

function Counter({ target, suffix = '', duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(ease * target))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    el.querySelectorAll('.hero-reveal').forEach((child, i) => {
      const c = child as HTMLElement
      c.style.opacity = '0'
      c.style.transform = 'translateY(32px)'
      setTimeout(() => {
        c.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)'
        c.style.opacity = '1'
        c.style.transform = 'translateY(0)'
      }, 200 + i * 120)
    })
  }, [])

  return (
    <section id="about" ref={heroRef} className="grid-bg px-6 md:px-8 pt-[120px] pb-16 md:py-32" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '20%', right: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(240,165,0,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,229,160,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <div className="hero-reveal" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }} className="pulse" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', wordBreak: 'keep-all' }}>
            Performance MD · E-Commerce · Seoul, KR
          </span>
        </div>

        <div className="hero-reveal" style={{ marginBottom: 24 }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 9vw, 110px)',
            fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.03em', color: 'var(--text-primary)',
          }}>
            SHIN<br />
            <span style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #ffcc60 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              YEON CHEOL
            </span>
          </h1>
        </div>

        <div className="hero-reveal" style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: 'var(--font-ko)', fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: 520, wordBreak: 'keep-all' }}>
            데이터 기반의 상품 기획 · 프로모션 운영 · 광고 성과 최적화.<br />
            지그재그·에이블리 중심 외부몰 전략으로 <strong style={{ color: 'var(--text-primary)' }}>연 180억+ 매출</strong>을 이끈 통합형 MD.
          </p>
        </div>

        {/* Live stats */}
        <div className="hero-reveal grid grid-cols-2 md:grid-cols-4" style={{ gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', maxWidth: 700, marginBottom: 56 }}>
          {[
            { label: '지그재그 최고 매출', value: 180, suffix: '억', color: 'accent' },
            { label: '에이블리 성장률', value: 200, suffix: '%+', color: 'green' },
            { label: '퀸잇 매출 상승', value: 400, suffix: '%', color: 'blue' },
            { label: 'MD 경력', value: 9, suffix: 'yr+', color: 'accent' },
          ].map((stat, i) => (
            <div key={i} className="px-4 md:px-5 py-4 md:py-6" style={{ background: 'var(--bg-card)' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 6vw, 36px)', fontWeight: 900, lineHeight: 1,
                letterSpacing: '-0.01em',
                background: stat.color === 'green' ? 'linear-gradient(135deg, var(--green), #80ffcc)' : stat.color === 'blue' ? 'linear-gradient(135deg, var(--blue), #80c8ff)' : 'linear-gradient(135deg, var(--accent), #ffcc60)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                <Counter target={stat.value} suffix={stat.suffix} duration={1600 + i * 200} />
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginTop: 8, wordBreak: 'keep-all' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="hero-reveal flex flex-col sm:flex-row gap-4">
          <a href="#projects" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px 28px', background: 'var(--accent)', color: '#000',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
            letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: 8, textDecoration: 'none',
          }}>프로젝트 보기 →</a>
          <a href="#kpi" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px 28px', border: '1px solid var(--border-bright)',
            color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)',
            fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: 8, textDecoration: 'none',
          }}>성과 보기</a>
        </div>

        <div className="hero-reveal" style={{ marginTop: 64, display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[
            { label: 'BRAND', value: '아뜨랑스' },
            { label: 'CHANNEL', value: '지그재그 · 에이블리' },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontFamily: 'var(--font-ko)', fontSize: 13, color: 'var(--text-secondary)' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
