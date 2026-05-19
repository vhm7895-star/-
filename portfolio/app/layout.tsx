import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '신연철 | 퍼포먼스 MD 포트폴리오',
  description: '지그재그 180억 · 에이블리 150억 · 퀸잇 베스트 2위. 데이터로 기획하고 숫자로 증명하는 이커머스 퍼포먼스 MD 신연철의 포트폴리오.',
  keywords: ['온라인MD', '퍼포먼스MD', '이커머스', '지그재그', '에이블리', '신연철', 'MD포트폴리오'],
  openGraph: {
    title: '신연철 | 퍼포먼스 MD',
    description: '지그재그 180억 · 에이블리 150억. 숫자로 증명하는 퍼포먼스 MD.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
