import { useState } from 'react'
import {
  Triangle,
  getTriangleType,
  getTriangleAngles,
  isValidTriangle,
} from '../lib/triangle'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useToast } from './ui/use-toast'
import Results from './Results'

const TriangleCalculator = () => {
  const [sideA, setsideA] = useState<number>(0)
  const [sideB, setsideB] = useState<number>(0)
  const [sideC, setsideC] = useState<number>(0)
  const [triangle, setTriangle] = useState<Triangle | null | undefined>()
  const { toast } = useToast()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    getTriangleInfo()
  }

  const getTriangleInfo = () => {
    const triangleType = getTriangleType(sideA, sideB, sideC)
    const triangleAngles = getTriangleAngles(sideA, sideB, sideC)

    if (isValidTriangle(sideA, sideB, sideC)) {
      return toast({
        title: 'Triangulo invalido',
        description:
          'Os lados inseridos são invalidos, certifique-se de que todos são numeros positivos',
        variant: 'destructive',
      })
    }
    setTriangle({
      type: triangleType,
      angles: triangleAngles,
      vertices: [sideA, sideB, sideC],
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de Triangulos</CardTitle>
          <CardDescription>
            Calcule o angulo de um triangulo usando os seus vertices
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <Input
                type="number"
                placeholder="Lado 1"
                onChange={(e) => setsideA(e.target.valueAsNumber)}
              />
              <Input
                type="number"
                placeholder="Lado 2"
                onChange={(e) => setsideB(e.target.valueAsNumber)}
              />
              <Input
                type="number"
                placeholder="Lado 3"
                onChange={(e) => setsideC(e.target.valueAsNumber)}
              />
            </div>
          </CardContent>
          <CardFooter className="grid w-full">
            <Button className="btn" onClick={getTriangleInfo}>
              Testar
            </Button>
          </CardFooter>
        </form>
      </Card>
      <br />
      {triangle && <Results triangle={triangle} />}
    </>
  )
}

export default TriangleCalculator
