import { CoreFeaturesSection } from './components/CoreFeaturesSection'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Roles } from './components/Roles'
import { SeniorCopilotSection } from './components/SeniorCopilotSection'

function App() {
  return (
    <div className="min-h-dvh bg-mixbus-bg">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-mixbus-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-mixbus-black"
      >
        Ir al contenido principal
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <CoreFeaturesSection />
        <SeniorCopilotSection />
        <Roles />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
