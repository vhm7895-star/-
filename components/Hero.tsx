'use client'
import { useEffect, useRef, useState } from 'react'
import { profile } from '@/data/portfolio'

function Counter({ target, suffix = '', duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    let frameId: number;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(ease * target))
          if (progress < 1) {
            frameId = requestAnimationFrame(tick)
          } else {
            setCount(target)
          }
        }
        frameId = requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      if (frameId) cancelAnimationFrame(frameId)
    }
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
    <section id="about" ref={heroRef} className="grid-bg" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '120px 32px 80px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '20%', right: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(240,165,0,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,229,160,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <div className="hero-reveal" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }} className="pulse" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Shelter Manager · Animal Care · Incheon, KR
          </span>
        </div>

        <div className="hero-reveal" style={{ marginBottom: 24 }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 9vw, 110px)',
            fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.03em', color: 'var(--text-primary)',
          }}>
            CHOI<br />
            <span style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #ffcc60 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              SEUNGMIN
            </span>
          </h1>
        </div>

        <div className="hero-reveal" style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: 'var(--font-ko)', fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: 520 }}>
            생명의 가치를 최우선으로 생각하는 보호소 관리 매니저.<br />
            유기동물 보호소와 지자체를 거치며 <strong style={{ color: 'var(--text-primary)' }}>4년 5개월</strong>간 상처받은 동물들을 돌보고, 새로운 가족의 품으로 안겨주는 따뜻한 변화를 이끌어왔습니다.
          </p>
        </div>

        {/* Live stats */}
        <div className="hero-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', maxWidth: 700, marginBottom: 56 }}>
          {[
            { label: '월 평균 입소 동물 케어', value: 70, suffix: '마리', color: 'accent' },
            { label: '상시 집중 관리 동물', value: 50, suffix: '마리', color: 'green' },
            { label: '월 평균 성공적 입양', value: 10, suffix: '마리', color: 'blue' },
            { label: '현장 실무 경력', value: 5, suffix: '년차', color: 'accent' },
          ].map((stat, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', padding: '24px 20px' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, lineHeight: 1,
                letterSpacing: '-0.01em',
                background: stat.color === 'green' ? 'linear-gradient(135deg, var(--green), #80ffcc)' : stat.color === 'blue' ? 'linear-gradient(135deg, var(--blue), #80c8ff)' : 'linear-gradient(135deg, var(--accent), #ffcc60)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                <Counter target={stat.value} suffix={stat.suffix} duration={1600 + i * 200} />
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginTop: 8 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="hero-reveal" style={{ display: 'flex', gap: 16 }}>
          <a href="#projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 28px', background: 'var(--accent)', color: '#000',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
            letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: 8, textDecoration: 'none',
          }}>프로젝트 보기 →</a>
          <a href="#kpi" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 28px', border: '1px solid var(--border-bright)',
            color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)',
            fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: 8, textDecoration: 'none',
          }}>성과 보기</a>
        </div>
      </div>
    </section>
  )
}
