'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/data/portfolio'

const categoryColors: Record<string, string> = {
  '데이터 파악 및 문서화': 'var(--green)',
  '시설 및 물자 관리': 'var(--accent)',
  'CS 및 전화 응대': 'var(--blue)',
  '사후 관리 및 소통': 'var(--purple)',
  '현장 동물 보호': 'var(--accent)',
  '사용 툴': 'var(--text-secondary)',
}

const colorHex: Record<string, string> = {
  '데이터 파악 및 문서화': '#00e5a0',
  '시설 및 물자 관리': '#f0a500',
  'CS 및 전화 응대': '#4d9fff',
  '사후 관리 및 소통': '#a855f7',
  '현장 동물 보호': '#f0a500',
  '사용 툴': '#888888',
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}



export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="skills" ref={ref} style={{ padding: '100px 32px', background: 'var(--bg-2)' }}>
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
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}
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
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item}</span>
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



      </div>
    </section>
  )
}
