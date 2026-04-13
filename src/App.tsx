import { CoreFeaturesSection } from './components/CoreFeaturesSection'
import { FinalCTA } from './components/FinalCTA'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Roles } from './components/Roles'
import { SeniorCopilotSection } from './components/SeniorCopilotSection'

function App() {
  return (
    <div className="min-h-dvh bg-mixbus-bg">
      <Header />
      <main>
        <Hero />
        <CoreFeaturesSection />
        <SeniorCopilotSection />
        <Roles />
        <FinalCTA />
      </main>
    </div>
  )
}

export default App
