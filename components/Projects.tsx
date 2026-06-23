'use client'
import { useEffect, useRef, useState } from 'react'
import { projects } from '@/data/portfolio'

const tagStyles: Record<string, { bg: string; color: string }> = {
  blue:   { bg: 'rgba(77,159,255,0.1)',   color: 'var(--blue)' },
  accent: { bg: 'rgba(240,165,0,0.1)',    color: 'var(--accent)' },
  green:  { bg: 'rgba(0,229,160,0.1)',    color: 'var(--green)' },
  purple: { bg: 'rgba(176,106,255,0.1)',  color: 'var(--purple)' },
}

// 고정 퍼센트 배열 사용 — 텍스트 파싱 안 함
const RESULT_PCTS = [
  [100, 80, 60],   // project 01: 400%, 2위, 100%
  [100, 100, 60],  // project 02: +400%, 100%, 100%
  [70, 100, 80],   // project 03: 180억, +260%, +200%
]

function MiniBar({ pct, color }: { pct: number; color: string }) {
  const [w, setW] = useState('0%')
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setW(`${pct}%`), 300)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [pct])
  return (
    <div ref={ref} style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden', marginTop: 6 }}>
      <div style={{ height: '100%', width: w, background: color, borderRadius: 999, transition: 'width 1s cubic-bezier(0.16,1,0.3,1)', boxShadow: `0 0 8px ${color}66` }} />
    </div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 100)) })
    }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" ref={ref} className="px-6 md:px-8 py-16 md:py-24" style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-label reveal">
          <div>
            <div className="label" style={{ marginBottom: 6 }}>05 — CASE STUDIES</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Projects</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
          {projects.map((project, projIdx) => {
            const ts = tagStyles[project.color] || tagStyles.accent
            return (
              <div key={project.id} className="reveal card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 999, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', fontWeight: 600, background: ts.bg, color: ts.color, border: `1px solid ${ts.color}33`, textTransform: 'uppercase' }}>{project.category}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)' }}>{project.period}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 6, wordBreak: 'keep-all' }}>{project.title}</h3>
                  <div style={{ fontFamily: 'var(--font-ko)', fontSize: 12, color: 'var(--text-secondary)' }}>{project.company} · 기여도 {project.contribution}</div>
                </div>

                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.75, wordBreak: 'keep-all' }}>{project.problem}</p>

                {/* Strategies */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 10 }}>실행 전략</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {project.strategies.map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, wordBreak: 'keep-all' }}>
                        <span style={{ color: ts.color, fontFamily: 'var(--font-mono)', fontSize: 10, flexShrink: 0, marginTop: 2 }}>→</span>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results - 고정 퍼센트 막대 사용 */}
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 16 }}>RESULTS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {project.results.map((r, i) => {
                      const pct = (RESULT_PCTS[projIdx] ?? [80, 60, 40])[i] ?? 60
                      return (
                        <div key={i}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', wordBreak: 'keep-all' }}>{r.label}</span>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: ts.color }}>{r.value}</span>
                          </div>
                          <MiniBar pct={pct} color={ts.color} />
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)', marginTop: 4, wordBreak: 'keep-all' }}>{r.note}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Insight */}
                <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 14 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 6 }}>INSIGHT</div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic', wordBreak: 'keep-all' }}>"{project.insight}"</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
