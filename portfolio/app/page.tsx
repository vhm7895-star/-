import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import KPI from '@/components/KPI'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />       {/* 1. Hero */}
      <KPI />        {/* 2. 핵심 성과 */}
      <Projects />   {/* 3. 대표 프로젝트 */}
      <Skills />     {/* 4. 광고/데이터 역량 */}
      <Experience /> {/* 5. About Me + 경력 */}
      <Contact />    {/* 6. Contact CTA */}
    </main>
  )
}
