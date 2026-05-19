'use client'
import { useEffect, useRef, useState } from 'react'

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
    let frameId: number;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1)
          setV(Math.round((1 - Math.pow(1 - p, 3)) * target))
          if (p < 1) {
            frameId = requestAnimationFrame(tick)
          } else {
            setV(target)
          }
        }
        frameId = requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (spanRef.current) obs.observe(spanRef.current)
    return () => {
      obs.disconnect()
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [target, duration])
  return <span ref={spanRef}>{v}{suffix}</span>
}

function BarChart({ data, label }: { data: { year: string; value: number; color: string }[]; label: string }) {
  const { ref, inView } = useInView(0.3)
  const max = Math.max(...data.map(d => d.value))
  return (
    <div ref={ref}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 20 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: d.color, fontWeight: 600 }}>{d.value}</div>
            <div style={{
              width: '100%', height: inView ? `${(d.value / max) * 120}px` : '0px',
              background: d.color,
              opacity: 0.9,
              borderRadius: '4px 4px 0 0',
              transition: `height 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
            }} />
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
        <span style={{ fontFamily: 'var(--font-ko)', fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{label}</span>
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
    <section id="kpi" ref={sectionRef} style={{ padding: '100px 32px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-label reveal">
          <div>
            <div className="label" style={{ marginBottom: 6 }}>03 — FIELD PERFORMANCE</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Impact & Care Data</h2>
          </div>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
          {[
            { value: 840, suffix: '마리+', label: '연간 유기동물 보호/케어', sub: '월 평균 70마리 입소 · 상시 집중 관리', color: 'accent' },
            { value: 120, suffix: '건+', label: '연간 성공적 입양/반환', sub: '월 10건 이상 새로운 가족 품으로', color: 'green' },
            { value: 100, suffix: '%', label: '보호소 무사고/안전 유지', sub: '노후 시설 펜스 보수 및 위생 관리 철저', color: 'blue' },
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
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-ko)', fontSize: 13, color: 'var(--text-muted)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div className="card" style={{ padding: '32px' }}>
            <BarChart label="연도별 동물 보호/관리 실적 (마리)" data={[{ year: "'22", value: 650, color: 'var(--accent)' }, { year: "'23", value: 720, color: 'var(--accent)' }, { year: "'24", value: 840, color: 'var(--accent)' }, { year: "'25", value: 850, color: 'var(--accent)' }]} />
          </div>
          <div className="card" style={{ padding: '32px' }}>
            <BarChart label="연도별 성공적 입양/반환 성과 (마리)" data={[{ year: "'22", value: 80, color: 'var(--green)' }, { year: "'23", value: 95, color: 'var(--green)' }, { year: "'24", value: 120, color: 'var(--green)' }, { year: "'25", value: 130, color: 'var(--green)' }]} />
          </div>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="card" style={{ padding: '32px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 20 }}>현장 실무 관리 지표</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <ProgressBar label="유기동물 현장 케어 집중률" value={100} max={100} color="var(--accent)" />
              <ProgressBar label="입양 사후 관리 완료율 (사진 확인)" value={100} max={100} color="var(--green)" />
              <ProgressBar label="위생/방역 및 시설 점검 이행률" value={100} max={100} color="var(--blue)" />
              <ProgressBar label="보호자 및 방문객 안내 민원 만족도" value={100} max={100} color="var(--purple)" />
            </div>
          </div>
          <div className="card" style={{ padding: '32px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 20 }}>핵심 업무 성과 요약</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '🐾', title: '체계적인 엑셀 데이터화', desc: '수백 마리의 동물 현황 완벽 기록', accent: 'var(--accent)' },
                { icon: '🤝', title: '주말 봉사자 15명 리딩', desc: '효율적인 작업 분배 및 인솔', accent: 'var(--green)' },
                { icon: '🛡️', title: '시설 및 물자 안정성 확보', desc: '사료/배변패드 등 무재고 방지', accent: 'var(--blue)' },
                { icon: '💕', title: '입양 후 100% 사후 관리', desc: '지속적인 사진 확인 및 적응 모니터링', accent: 'var(--purple)' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontFamily: 'var(--font-ko)', fontSize: 12, color: 'var(--text-secondary)' }}>{item.desc}</div>
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
