import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '최승민 | 보호소 관리 매니저 포트폴리오',
  description: '생명의 가치를 최우선으로 생각하는 보호소 관리 매니저 최승민의 포트폴리오입니다. 4년 5개월간 유기동물 보호, 입양, 센터 관리를 책임졌습니다.',
  keywords: ['보호소관리', '동물관리', '유기동물', '보호소매니저', '최승민'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=JetBrains+Mono:wght@300;400;500&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
