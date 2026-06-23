'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/data/portfolio'

const categoryColors: Record<string, string> = {
  '데이터 분석': 'var(--accent)',
  '광고 & 프로모션': 'var(--green)',
  '상품 기획': 'var(--blue)',
  'SEO & 콘텐츠': 'var(--purple)',
  '채널 운영': 'var(--accent)',
  '툴': 'var(--text-secondary)',
}

const colorHex: Record<string, string> = {
  '데이터 분석': '#f0a500',
  '광고 & 프로모션': '#00e5a0',
  '상품 기획': '#4d9fff',
  'SEO & 콘텐츠': '#a855f7',
  '채널 운영': '#f0a500',
  '툴': '#888888',
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const platforms = ['지그재그', '에이블리', '퀸잇', 'G마켓', '옥션', '11번가', '자사몰', '하프클럽']

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="skills" ref={ref} className="px-6 md:px-8 py-16 md:py-24" style={{ paddingLeft: 24, paddingRight: 24, background: 'var(--bg-2)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* 섹션 헤더 */}
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 40 }}
        >
          <div>
            <div className="label" style={{ marginBottom: 6 }}>04 — COMPETENCIES</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Skills & Tools
            </h2>
          </div>
        </motion.div>

        {/* 카드 그리드 — stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          style={{ gap: 12 }}
        >
          {skills.map((skill, idx) => {
            const color = categoryColors[skill.category] || 'var(--text-secondary)'
            const hex = colorHex[skill.category] || '#888888'
            const isHov = hovered === skill.category

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                onHoverStart={() => setHovered(skill.category)}
                onHoverEnd={() => setHovered(null)}
                className="card"
                style={{
                  padding: '28px',
                  cursor: 'default',
                  borderColor: isHov ? hex + '55' : 'var(--border)',
                  boxShadow: isHov
                    ? `0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px ${hex}22`
                    : '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'border-color 0.3s ease, box-shadow 0.35s ease',
                }}
              >
                {/* 카테고리 라벨 + dot */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0,
                    boxShadow: isHov ? `0 0 10px ${hex}, 0 0 4px ${hex}88` : 'none',
                    transition: 'box-shadow 0.35s ease',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    letterSpacing: '0.1em', color, fontWeight: 600, textTransform: 'uppercase',
                  }}>
                    {skill.category}
                  </span>
                </div>

                {/* 항목 목록 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {skill.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: color, opacity: 0.5, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4, wordBreak: 'keep-all' }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* 하단 dot 인디케이터 */}
                <div style={{ display: 'flex', gap: 4, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: isHov && i < skill.items.length ? color : 'var(--border)',
                      boxShadow: isHov && i < skill.items.length ? `0 0 6px ${hex}` : 'none',
                      transition: 'all 0.3s ease',
                    }} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* 운영 플랫폼 바 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center flex-wrap mt-3 px-6 md:px-8 py-5"
          style={{
            gap: '8px 0px',
            background: 'var(--bg-card)', borderRadius: 16, overflow: 'hidden',
            border: '1px solid var(--border)',
          }}
        >
          <span className="mr-6 md:mr-8" style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em',
            color: 'var(--accent)', textTransform: 'uppercase', whiteSpace: 'nowrap',
          }}>
            운영 플랫폼
          </span>
          <div className="flex flex-wrap items-center" style={{ gap: '4px 0px' }}>
            {platforms.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <motion.span
                  whileHover={{ color: '#fff', transition: { duration: 0.2 } }}
                  style={{
                    fontFamily: 'var(--font-ko)', fontSize: 14, fontWeight: 500,
                    color: 'var(--text-secondary)', whiteSpace: 'nowrap', cursor: 'default',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {p}
                </motion.span>
                {i < platforms.length - 1 && (
                  <span style={{ margin: '0 12px', color: 'var(--text-muted)', fontSize: 12 }}>·</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
