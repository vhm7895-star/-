import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import KPI from '@/components/KPI'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Experience />
      <KPI />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}
