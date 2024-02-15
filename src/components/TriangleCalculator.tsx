import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import Results from './Results'
import TriangleForm from './TriangleForm'
import { useAtom } from 'jotai'
import { triangleAtom } from './triangleAtom'

const TriangleCalculator = () => {
  const [triangle] = useAtom(triangleAtom)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de Triangulos</CardTitle>
          <CardDescription>
            Calcule o angulo de um triangulo usando os seus vertices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TriangleForm />
        </CardContent>
      </Card>
      <br />
      {triangle && <Results triangle={triangle} />}
    </>
  )
}

export default TriangleCalculator
