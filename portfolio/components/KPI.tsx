'use client'
import { useEffect, useRef, useState } from 'react'
import { kpis } from '@/data/portfolio'

function Counter({ target, suffix = '', duration = 1800 }: { target: number, suffix?: string, duration?: number }) {
  const [v, setV] = useState(0)
  const started = useRef(false)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1)
          setV(Math.round((1 - Math.pow(1 - p, 3)) * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])
  return <span ref={ref}>{v}{suffix}</span>
}

function useReveal() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el, i) => {
          setTimeout(() => el.classList.add('in'), i * 80)
        })
      })
    }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return ref
}

// Bar chart for revenue
function RevenueChart() {
  const [ready, setReady] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setReady(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const bars = [
    { label: "'22", zigzag: 50, ably: 50 },
    { label: "'23", zigzag: 180, ably: 150 },
    { label: "'24", zigzag: 140, ably: 140 },
  ]
  const max = 200

  return (
    <div ref={ref} style={{ padding: '32px' }}>
      <div className="eyebrow" style={{ marginBottom: 20 }}>연간 채널별 매출 추이 (억원)</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 160, marginBottom: 12 }}>
        {bars.map((b, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: '100%', width: '100%' }}>
              {/* Zigzag bar */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                <div style={{ fontSize: 10, color: 'var(--gold)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{b.zigzag}억</div>
                <div style={{
                  width: '100%', borderRadius: '2px 2px 0 0',
                  height: ready ? `${(b.zigzag / max) * 130}px` : '0px',
                  background: 'var(--gold)',
                  transition: `height 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                }} />
              </div>
              {/* Ably bar */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                <div style={{ fontSize: 10, color: 'var(--green)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{b.ably}억</div>
                <div style={{
                  width: '100%', borderRadius: '2px 2px 0 0',
                  height: ready ? `${(b.ably / max) * 130}px` : '0px',
                  background: 'var(--green)',
                  transition: `height 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.12 + 0.08}s`,
                }} />
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', width: '100%', paddingTop: 6, textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-4)' }}>{b.label}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 10, height: 10, background: 'var(--gold)', borderRadius: 1 }} />
          <span className="label-sm">지그재그</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 10, height: 10, background: 'var(--green)', borderRadius: 1 }} />
          <span className="label-sm">에이블리</span>
        </div>
      </div>
    </div>
  )
}

export default function KPI() {
  const ref = useReveal()

  const bigKpis = [
    { value: 180, suffix: '억', label: '지그재그 연간 최고 매출', sub: '22년 50억 → 23년 180억', badge: '+260% YoY', badgeClass: 'badge-gold' },
    { value: 150, suffix: '억', label: '에이블리 연간 최고 매출', sub: '22년 50억 → 23년 150억', badge: '+200% YoY', badgeClass: 'badge-green' },
    { value: 400, suffix: '%', label: '퀸잇 채널 매출 상승', sub: '입점 후 2개월 기준', badge: '베스트 브랜드 2위', badgeClass: 'badge-blue' },
  ]

  const smallKpis = [
    '하프클럽 MBO — 전월 대비 매출 +400% 달성',
    '퀸잇 입점 2개월 만에 스토어 베스트 랭킹 2위',
    '지그재그·에이블리 시즌 기획전 연 20회+ 기획 운영',
    '히어로 상품 전략적 푸시로 스테디셀러 전환율 극대화',
    '키워드 SEO 최적화로 검색 유입 기반 자연 매출 확대',
    '9년간 5개 브랜드 / 8개 채널 운영 누적 경험 보유',
    '시즌 큐레이션 → 기획전 구좌 노출 전환율 개선',
  ]

  return (
    <section id="kpi" ref={ref as React.RefObject<HTMLElement>} className="section" style={{ background: 'var(--warm)' }}>
      <div className="container">
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>02 — 핵심 성과</div>
          <h2 className="display-lg">숫자가 증명하는<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>실행력</em></h2>
        </div>

        {/* Big 3 KPIs */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 16 }}>
          {bigKpis.map((k, i) => (
            <div key={i} className="card" style={{ padding: 32 }}>
              <div style={{ marginBottom: 16 }}>
                <div className="stat-num">
                  <Counter target={k.value} suffix={k.suffix} duration={1600 + i * 200} />
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-4)', marginBottom: 12 }}>{k.sub}</div>
              <span className={`badge ${k.badgeClass}`}>{k.badge}</span>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* Chart */}
          <div className="card">
            <RevenueChart />
          </div>

          {/* KPI list */}
          <div className="card" style={{ padding: 32 }}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>주요 KPI 요약</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {smallKpis.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  padding: '13px 0',
                  borderBottom: i < smallKpis.length - 1 ? '1px solid var(--border-2)' : 'none',
                }}>
                  <div style={{ width: 20, height: 20, borderRadius: 2, background: 'var(--gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', fontWeight: 500 }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
