'use client'
import { useEffect, useRef, useState } from 'react'
import { kpis } from '@/data/portfolio'

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function Counter({ target, suffix = '', duration = 1600 }: { target: number; suffix?: string; duration?: number }) {
  const [v, setV] = useState(0)
  const started = useRef(false)
  const spanRef = useRef<HTMLSpanElement>(null)
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
    if (spanRef.current) obs.observe(spanRef.current)
    return () => obs.disconnect()
  }, [target, duration])
  return <span ref={spanRef}>{v}{suffix}</span>
}

function BarChart({ data, label }: { data: { year: string; value: number; color: string; current?: number }[]; label: string }) {
  const { ref, inView } = useInView(0.3)
  const max = Math.max(...data.map(d => d.value))
  return (
    <div ref={ref}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 20, wordBreak: 'keep-all' }}>{label}</div>
      <div className="flex gap-2 sm:gap-3" style={{ alignItems: 'flex-end', height: 160 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: d.color, fontWeight: 600, textAlign: 'center', lineHeight: 1.2 }}>
              {d.current ? (
                <>
                  <span style={{ fontSize: 9, opacity: 0.8 }}>현재 {d.current}억</span><br/>
                  <span style={{ fontSize: 10 }}>예상 {d.value}억</span>
                </>
              ) : (
                `${d.value}억`
              )}
            </div>
            <div style={{
              width: '100%', height: inView ? `${(d.value / max) * 120}px` : '0px',
              position: 'relative',
              transition: `height 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
            }}>
              {d.current ? (
                <>
                  <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${(d.current/d.value)*100}%`, background: d.color, borderRadius: '0' }} />
                  <div style={{ position: 'absolute', top: 0, width: '100%', height: `${100 - (d.current/d.value)*100}%`, background: d.color, opacity: 0.3, borderRadius: '4px 4px 0 0' }} />
                </>
              ) : (
                <div style={{ width: '100%', height: '100%', background: d.color, opacity: 0.9, borderRadius: '4px 4px 0 0' }} />
              )}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>{d.year}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProgressBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const { ref, inView } = useInView(0.3)
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-ko)', fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', wordBreak: 'keep-all' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color, fontWeight: 600 }}>{value}%</span>
      </div>
      <div className="prog-track">
        <div className="prog-fill" style={{ width: inView ? `${(value / max) * 100}%` : '0%', background: color, boxShadow: `0 0 8px ${color}66` }} />
      </div>
    </div>
  )
}

export default function KPI() {
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 80)) })
    }, { threshold: 0.05 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="kpi" ref={sectionRef} className="px-6 md:px-8 py-16 md:py-24" style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-label reveal">
          <div>
            <div className="label" style={{ marginBottom: 6 }}>03 — PERFORMANCE</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Data & Results</h2>
          </div>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-3" style={{ gap: 12, marginBottom: 16 }}>
          {[
            { value: 180, suffix: '억+', label: '지그재그 연간 최고 매출', sub: '22년 50억 → 23년 180억 → ... → 26년 상반기 48억 (연 132억 예상)', color: 'accent' },
            { value: 200, suffix: '%+', label: '에이블리 성장률', sub: '22년 50억 → 23년 150억 → ... → 26년 상반기 42억 (연 127억 예상)', color: 'green' },
            { value: 400, suffix: '%', label: '퀸잇 신규 입점 매출 상승', sub: '입점 2개월 만에 달성', color: 'blue' },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding: '32px 24px', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: -20, right: -20, width: 100, height: 100,
                background: s.color === 'green' ? 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)' : s.color === 'blue' ? 'radial-gradient(circle, rgba(77,159,255,0.08) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(240,165,0,0.08) 0%, transparent 70%)',
              }} />
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 800, lineHeight: 1,
                background: s.color === 'green' ? 'linear-gradient(135deg, var(--green), #80ffcc)' : s.color === 'blue' ? 'linear-gradient(135deg, var(--blue), #80c8ff)' : 'linear-gradient(135deg, var(--accent), #ffcc60)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 8,
              }}>
                <Counter target={s.value} suffix={s.suffix} duration={1600 + i * 200} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4, wordBreak: 'keep-all' }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', wordBreak: 'keep-all' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-2" style={{ gap: 16, marginBottom: 16 }}>
          <div className="card" style={{ padding: '32px' }}>
            <BarChart label="지그재그 연간 매출 추이 (억원)" data={[{ year: "'22", value: 50, color: 'var(--accent)' }, { year: "'23", value: 180, color: 'var(--accent)' }, { year: "'24", value: 140, color: 'var(--accent)' }, { year: "'25", value: 120, color: 'var(--accent)' }, { year: "'26", value: 132, current: 48, color: 'var(--accent)' }]} />
          </div>
          <div className="card" style={{ padding: '32px' }}>
            <BarChart label="에이블리 연간 매출 추이 (억원)" data={[{ year: "'22", value: 50, color: 'var(--green)' }, { year: "'23", value: 150, color: 'var(--green)' }, { year: "'24", value: 140, color: 'var(--green)' }, { year: "'25", value: 115, color: 'var(--green)' }, { year: "'26", value: 127, current: 42, color: 'var(--green)' }]} />
          </div>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
          <div className="card" style={{ padding: '32px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 20 }}>채널별 주요 성과 지표</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <ProgressBar label="지그재그 YoY 성장률" value={260} max={400} color="var(--accent)" />
              <ProgressBar label="에이블리 YoY 성장률" value={200} max={400} color="var(--green)" />
              <ProgressBar label="퀸잇 매출 상승률" value={400} max={400} color="var(--blue)" />
              <ProgressBar label="하프클럽 MBO 전월 대비" value={400} max={400} color="var(--purple)" />
            </div>
          </div>
          <div className="card" style={{ padding: '32px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 20 }}>프로젝트 임팩트 요약</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '🏆', title: '퀸잇 베스트 브랜드 2위', desc: '입점 2개월 만에 달성', accent: 'var(--accent)' },
                { icon: '🚀', title: '아뜨랑스 지그재그 180억', desc: '22년 대비 260% 성장', accent: 'var(--green)' },
                { icon: '⚡', title: '하프클럽 MBO 400%', desc: '11월 단월 전월 대비', accent: 'var(--blue)' },
                { icon: '📊', title: '에이블리 3배 성장', desc: '22→23년 50억→150억', accent: 'var(--purple)' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3, wordBreak: 'keep-all' }}>{item.title}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>{item.desc}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', width: 3, height: 36, background: item.accent, borderRadius: 2, opacity: 0.8 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
