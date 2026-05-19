'use client'
import { useEffect, useRef } from 'react'
import { experiences, education, profile } from '@/data/portfolio'

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 100))
      })
    }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" ref={ref} style={{ padding: '100px 32px', background: 'var(--bg-2)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-label reveal">
          <div>
            <div className="label" style={{ marginBottom: 6 }}>02 — CAREER</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Experience</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 4, top: 10, bottom: 40, width: 1, background: 'linear-gradient(180deg, var(--accent) 0%, rgba(240,165,0,0.1) 80%, transparent 100%)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {experiences.map((exp, idx) => (
                <div key={exp.id} className="reveal" style={{ display: 'flex', gap: 28, paddingBottom: idx < experiences.length - 1 ? 28 : 0 }}>
                  <div style={{ position: 'relative', flexShrink: 0, paddingTop: 4 }}>
                    <div className="timeline-dot" style={exp.highlights.length === 0 ? { width: 6, height: 6, background: 'var(--text-muted)', boxShadow: 'none' } : {}} />
                  </div>
                  <div className="card" style={{ flex: 1, padding: exp.highlights.length === 0 ? '14px 20px' : '24px', opacity: exp.highlights.length === 0 ? 0.6 : 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: exp.highlights.length > 0 ? 12 : 0 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                          <span className="tag tag-muted">{exp.type}</span>
                          {exp.brand && <span className="tag tag-accent">{exp.brand}</span>}
                          {exp.channels && <span className="tag tag-blue">📡 {exp.channels}</span>}
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{exp.role}</h3>
                        <div style={{ fontFamily: 'var(--font-ko)', fontSize: 13, color: 'var(--text-secondary)' }}>{exp.company}</div>
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{exp.period}</div>
                    </div>
                    {exp.highlights.length > 0 && (
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {exp.highlights.map((item, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            <span style={{ color: 'var(--accent)', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: 11 }}>→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card reveal" style={{ padding: '24px' }}>
              <div className="label" style={{ marginBottom: 16 }}>EDUCATION</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {education.map((edu, i) => (
                  <div key={i} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 12 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>{edu.period}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>{edu.school}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{edu.major}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card reveal" style={{ padding: '24px' }}>
              <div className="label" style={{ marginBottom: 16 }}>CORE STRENGTH</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {profile.differentiators.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, background: 'var(--accent-dim)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{s.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{s.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.desc.slice(0, 30)}...</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card reveal" style={{ padding: '24px' }}>
              <div className="label" style={{ marginBottom: 16 }}>TOOLS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['사방넷', '포토샵', 'GPT', '지그재그 파트너센터', '에이블리 셀러허브', 'Excel'].map((tool, i) => (
                  <span key={i} className="tag tag-muted">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
