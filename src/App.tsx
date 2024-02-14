import TriangleCalculator from './TriangleCalculator'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <main className="max-w-6xl mx-auto my-12">
      <h1 className="mb-4">Incrivel Calculadora de Triangulos</h1>
      <TriangleCalculator />
      <Toaster />
    </main>
  )
}

export default App
