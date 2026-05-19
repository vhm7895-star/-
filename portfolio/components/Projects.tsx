'use client'
import { useEffect, useRef } from 'react'
import { projects } from '@/data/portfolio'

function useReveal(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 80))
      })
    }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
}

const colorMap: Record<string, { badge: string, accent: string, bg: string }> = {
  blue:   { badge: 'badge-blue',  accent: 'var(--blue)',  bg: 'var(--blue-lt)' },
  accent: { badge: 'badge-gold',  accent: 'var(--gold)',  bg: 'var(--gold-dim)' },
  green:  { badge: 'badge-green', accent: 'var(--green)', bg: 'var(--green-lt)' },
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section id="projects" ref={ref} className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div className="reveal" style={{ marginBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>03 — 대표 프로젝트</div>
          <h2 className="display-lg">성과로 읽는<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>실행 기록</em></h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {projects.map((proj, idx) => {
            const c = colorMap[proj.color] || colorMap.accent
            const isEven = idx % 2 === 1

            return (
              <div key={proj.id} className="reveal card" style={{ overflow: 'hidden', position: 'relative' }}>
                {/* Left color bar */}
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: c.accent }} />

                <div style={{ padding: '40px 40px 40px 52px', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 48, alignItems: 'start' }}>

                  {/* Left: problem + strategy */}
                  <div>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.1em' }}>
                        {proj.num}
                      </span>
                      <span className={`badge ${c.badge}`}>{proj.category}</span>
                      <span className="label-sm">{proj.period}</span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.25, marginBottom: 6 }}>
                      {proj.title}
                    </h3>
                    <div className="label-sm" style={{ marginBottom: 24 }}>
                      {proj.company} · 기여도 {proj.contribution}
                    </div>

                    {/* Problem */}
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--red)' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--red)', textTransform: 'uppercase' }}>문제 정의</span>
                      </div>
                      <div style={{ background: 'rgba(155,44,44,0.04)', border: '1px solid rgba(155,44,44,0.1)', borderRadius: 2, padding: '12px 16px' }}>
                        <p className="body-sm">{proj.problem}</p>
                      </div>
                    </div>

                    {/* Strategy */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: c.accent }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: c.accent, textTransform: 'uppercase' }}>실행 전략</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {proj.strategies.map((s, i) => (
                          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: c.accent, flexShrink: 0, marginTop: 2 }}>
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="body-sm" style={{ lineHeight: 1.65 }}>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: results + insight */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Results */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--green)' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--green)', textTransform: 'uppercase' }}>성과</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                        {proj.results.map((r, i) => (
                          <div key={i} style={{ background: c.bg, border: `1px solid ${c.accent}22`, borderRadius: 4, padding: '18px 14px', textAlign: 'center' }}>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 300, color: c.accent, lineHeight: 1, marginBottom: 4 }}>
                              {r.value}
                            </div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>{r.label}</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-4)', lineHeight: 1.4 }}>{r.note}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Insight */}
                    <div style={{
                      background: 'var(--paper)', border: '1px solid var(--border)',
                      borderRadius: 4, padding: '20px 20px 20px 24px',
                      position: 'relative',
                    }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'var(--gold)', borderRadius: '4px 0 0 4px' }} />
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 8 }}>
                        INSIGHT
                      </div>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', color: 'var(--ink-2)', lineHeight: 1.7 }}>
                        "{proj.insight}"
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
