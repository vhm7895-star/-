'use client'
import { useEffect, useRef } from 'react'
import { experiences, education, profile } from '@/data/portfolio'

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

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section id="experience" ref={ref} className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>06 — About Me</div>
          <h2 className="display-lg">9년, 5개 브랜드<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>8개 채널</em></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'start' }}>
          {/* Left: story + timeline */}
          <div>
            {/* Story */}
            <div className="reveal" style={{ marginBottom: 48 }}>
              {profile.story.map((para, i) => (
                <p key={i} className="body-lg" style={{ marginBottom: i < profile.story.length - 1 ? 20 : 0 }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Timeline */}
            <div className="reveal">
              <div className="eyebrow" style={{ marginBottom: 28 }}>경력 타임라인</div>
              <div style={{ position: 'relative' }}>
                <div className="tl-line" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {experiences.map((exp, i) => (
                    <div key={exp.id} style={{ display: 'flex', gap: 24, paddingLeft: 24, paddingBottom: i < experiences.length - 1 ? 28 : 0, position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 0, top: 4 }}>
                        {exp.highlights.length > 0 ? <div className="tl-dot" /> : <div className="tl-dot-sm" style={{ marginTop: 2 }} />}
                      </div>
                      <div className={exp.highlights.length > 0 ? 'card' : 'card-warm'} style={{
                        flex: 1, padding: exp.highlights.length > 0 ? '20px 24px' : '12px 20px',
                        opacity: exp.highlights.length === 0 ? 0.7 : 1,
                      }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: exp.highlights.length > 0 ? 6 : 0 }}>
                          <span className="label-sm">{exp.period}</span>
                          <span className="badge badge-ink">{exp.type}</span>
                          {exp.brand && <span className="badge badge-gold">{exp.brand}</span>}
                        </div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: 'var(--ink)', marginBottom: 2 }}>
                          {exp.role} <span style={{ fontSize: 14, fontWeight: 300, color: 'var(--ink-3)' }}>— {exp.company}</span>
                        </div>
                        {exp.channels && (
                          <div style={{ fontSize: 12, color: 'var(--ink-4)', marginBottom: exp.highlights.length > 0 ? 14 : 0 }}>
                            📡 {exp.channels}
                            {exp.tools ? `  ·  🛠 ${exp.tools}` : ''}
                          </div>
                        )}
                        {exp.highlights.length > 0 && (
                          <ul style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                            {exp.highlights.map((h, j) => (
                              <li key={j} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6 }}>
                                <span style={{ color: 'var(--gold)', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: 10, marginTop: 3 }}>→</span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Differentiators */}
            <div className="reveal card-gold" style={{ padding: 28, borderRadius: 4 }}>
              <div className="eyebrow" style={{ marginBottom: 20 }}>차별화 포인트</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {profile.differentiators.map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12 }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{d.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{d.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.6 }}>{d.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="reveal card" style={{ padding: 28 }}>
              <div className="eyebrow" style={{ marginBottom: 20 }}>학력</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {education.map((edu, i) => (
                  <div key={i} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: 14 }}>
                    <div className="label-sm" style={{ marginBottom: 4 }}>{edu.period}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{edu.school}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{edu.major}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career summary */}
            <div className="reveal card-warm" style={{ padding: 28, borderRadius: 4 }}>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Career Summary</div>
              {[
                { k: '총 경력', v: '9년+' },
                { k: '근무 브랜드', v: '5개' },
                { k: '운영 채널', v: '8개+' },
                { k: '연간 기획전', v: '20회+' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--border-2)' : 'none' }}>
                  <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>{r.k}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: 'var(--gold)' }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
