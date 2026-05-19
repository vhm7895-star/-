'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.h-reveal')
    els?.forEach((el, i) => {
      const e = el as HTMLElement
      e.style.opacity = '0'
      e.style.transform = 'translateY(24px)'
      setTimeout(() => {
        e.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)'
        e.style.opacity = '1'
        e.style.transform = 'translateY(0)'
      }, 100 + i * 130)
    })
  }, [])

  return (
    <section id="hero" ref={ref} style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '120px 40px 80px', background: 'var(--cream)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative background text */}
      <div style={{
        position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
        fontFamily: 'var(--font-display)', fontSize: 'clamp(160px,22vw,280px)',
        fontWeight: 300, color: 'rgba(26,24,20,0.04)', lineHeight: 1,
        userSelect: 'none', whiteSpace: 'nowrap', pointerEvents: 'none',
      }}>MD</div>

      <div style={{ maxWidth: 1080, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 80, alignItems: 'center' }}>

          {/* Left */}
          <div>
            <div className="h-reveal eyebrow" style={{ marginBottom: 32 }}>
              Performance MD · E-Commerce · Seoul
            </div>

            <h1 className="h-reveal" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(52px, 7.5vw, 96px)',
              fontWeight: 300, lineHeight: 0.95,
              letterSpacing: '-0.025em', color: 'var(--ink)',
              marginBottom: 8,
            }}>
              매출이<br />
              <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>말하게</span><br />
              합니다.
            </h1>

            <div className="h-reveal divider-gold" style={{ margin: '28px 0' }} />

            <p className="h-reveal body-lg" style={{ maxWidth: 480, marginBottom: 40 }}>
              지그재그 <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>180억</strong> ·
              에이블리 <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>150억</strong> ·
              퀸잇 베스트 브랜드 <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>2위</strong>.<br />
              데이터로 기획하고 숫자로 증명하는 퍼포먼스 MD.
            </p>

            <div className="h-reveal" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 56 }}>
              <a href="#projects" className="btn-primary">대표 프로젝트 보기 →</a>
              <a href="#kpi" className="btn-outline">성과 요약 보기</a>
            </div>

            {/* Quick stats strip */}
            <div className="h-reveal" style={{
              display: 'flex', gap: 0, borderTop: '1px solid var(--border)',
              paddingTop: 32,
            }}>
              {[
                { num: '9년+', label: 'MD 경력' },
                { num: '5개', label: '운영 브랜드' },
                { num: '8개+', label: '운영 채널' },
                { num: '20회+', label: '연간 기획전' },
              ].map((s, i) => (
                <div key={i} style={{
                  flex: 1, paddingRight: 24,
                  borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                  marginRight: i < 3 ? 24 : 0,
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, color: 'var(--ink)', lineHeight: 1, marginBottom: 4 }}>{s.num}</div>
                  <div className="label-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Profile card */}
          <div className="h-reveal">
            <div className="card" style={{ padding: 32, position: 'relative', overflow: 'hidden' }}>
              {/* Gold accent top */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--gold)' }} />

              {/* Avatar area */}
              <div style={{
                width: '100%', aspectRatio: '1', borderRadius: 2,
                background: 'linear-gradient(135deg, var(--paper) 0%, var(--warm) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 24, position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 64, fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>신</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 300, color: 'var(--ink-3)', marginTop: 4 }}>연철</div>
                </div>
                {/* Decorative */}
                <div style={{
                  position: 'absolute', bottom: -30, right: -30,
                  width: 100, height: 100, borderRadius: '50%',
                  border: '1px solid rgba(201,146,42,0.2)',
                }} />
                <div style={{
                  position: 'absolute', bottom: -50, right: -50,
                  width: 150, height: 150, borderRadius: '50%',
                  border: '1px solid rgba(201,146,42,0.1)',
                }} />
              </div>

              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: 'var(--ink)', marginBottom: 4 }}>
                신연철 <span style={{ fontSize: 14, fontWeight: 300, color: 'var(--ink-3)' }}>Shin Yeon Cheol</span>
              </div>
              <div className="badge badge-gold" style={{ marginBottom: 20 }}>Performance MD</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {[
                  { label: 'COMPANY', val: '(주)에스엔패션그룹' },
                  { label: 'BRAND', val: '아뜨랑스' },
                  { label: 'CHANNEL', val: '지그재그 · 에이블리' },
                  { label: 'CONTACT', val: 'vhm7895@naver.com' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 10, borderBottom: '1px solid var(--border-2)' }}>
                    <span className="label-sm">{r.label}</span>
                    <span style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 400 }}>{r.val}</span>
                  </div>
                ))}
              </div>

              {/* 3 differentiators */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  '🎯 플랫폼 밀착 운영 — 구좌를 직접 따낸다',
                  '📊 데이터 → 즉시 액션 실행',
                  '⚡ MD + 마케터 원스톱 운영',
                ].map((d, i) => (
                  <div key={i} className="card-warm" style={{ padding: '10px 14px', fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
