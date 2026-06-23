'use client'
import { useEffect, useRef, useState } from 'react'
import { skills } from '@/data/portfolio'

function useReveal(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 70))
      })
    }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
}

function ProgBar({ pct, color }: { pct: number, color: string }) {
  const [w, setW] = useState('0%')
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setW(`${pct}%`), 200) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [pct])
  return (
    <div ref={ref} className="prog-track">
      <div className="prog-fill" style={{ width: w, background: color }} />
    </div>
  )
}

const colorMap: Record<string, string> = {
  accent: 'var(--gold)',
  green:  'var(--green)',
  blue:   'var(--blue)',
  purple: '#7c5cbf',
  muted:  'var(--ink-4)',
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  // Competency bars for "광고/데이터 분석 역량" section
  const competencies = [
    { label: 'ROAS / CTR / CVR 분석', level: 92, color: 'var(--gold)' },
    { label: '기획전 구좌 운영 & MD 협업', level: 95, color: 'var(--gold)' },
    { label: '히어로 상품 발굴 & 큐레이션', level: 90, color: 'var(--green)' },
    { label: 'SEO / 키워드 최적화', level: 85, color: 'var(--green)' },
    { label: '프로모션 기획 & 카피라이팅', level: 88, color: 'var(--blue)' },
    { label: '이벤트 페이지 기획 & 구조', level: 80, color: 'var(--blue)' },
    { label: '채널별 성과 리포트 분석', level: 88, color: 'var(--gold)' },
    { label: '포토샵 썸네일 · 이미지 제작', level: 75, color: 'var(--ink-4)' },
  ]

  return (
    <section id="skills" ref={ref} className="section" style={{ background: 'var(--warm)' }}>
      <div className="container">
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>05 — 역량</div>
          <h2 className="display-lg">광고 · 데이터 · 기획<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>원스톱 운영</em></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          {/* Competency bars */}
          <div className="reveal card" style={{ padding: 36 }}>
            <div className="eyebrow" style={{ marginBottom: 24 }}>역량 수준</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {competencies.map((c, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{c.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: c.color }}>{c.level}%</span>
                  </div>
                  <ProgBar pct={c.level} color={c.color} />
                </div>
              ))}
            </div>
          </div>

          {/* Skill grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {skills.map((sk, i) => (
              <div key={i} className="reveal card" style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: colorMap[sk.color] || colorMap.accent }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: colorMap[sk.color], textTransform: 'uppercase', fontWeight: 500 }}>
                    {sk.category}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {sk.items.map((item, j) => (
                    <span key={j} style={{
                      fontSize: 12, color: 'var(--ink-3)',
                      padding: '3px 10px',
                      background: 'var(--paper)', border: '1px solid var(--border)',
                      borderRadius: 2,
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform strip */}
        <div className="reveal" style={{
          display: 'flex', alignItems: 'center', gap: 0,
          background: 'var(--ink)', borderRadius: 4, overflow: 'hidden',
          padding: '20px 32px',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', whiteSpace: 'nowrap', marginRight: 32 }}>
            운영 플랫폼
          </span>
          {['지그재그', '에이블리', '퀸잇', 'G마켓', '옥션', '11번가', '자사몰', '하프클럽', '종합몰'].map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(249,246,240,0.7)', whiteSpace: 'nowrap' }}>{p}</span>
              {i < 8 && <span style={{ margin: '0 16px', color: 'rgba(249,246,240,0.2)', fontSize: 12 }}>·</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
