import { useState } from 'react'
import { Triangle, getTriangleType, getTriangleAngles } from './triangle'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { useToast } from './components/ui/use-toast'
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from './components/ui/table'

const TriangleCalculator = () => {
  const [sideA, setsideA] = useState<number>(0)
  const [sideB, setsideB] = useState<number>(0)
  const [sideC, setsideC] = useState<number>(0)
  const [triangle, setTriangle] = useState<Triangle | null | undefined>()
  const { toast } = useToast()

  const handleSubmit = () => {
    handleClear()

    const triangleType = getTriangleType(sideA, sideB, sideC)
    const triangleAngles = getTriangleAngles(sideA, sideB, sideC)

    if (triangleAngles === 'invalid' || triangleType === 'invalid') {
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

  const handleClear = () => {
    setTriangle(null)
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
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
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
          </form>
        </CardContent>
        <CardFooter className="grid w-full">
          <Button className="btn" onClick={handleSubmit}>
            Testar
          </Button>
        </CardFooter>
      </Card>
      <br />
      {triangle && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
            <CardDescription>Trinangulo {triangle.type}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>
                Informações do triangulo {triangle.type}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Dado</TableHead>
                  <TableHead>Lado A</TableHead>
                  <TableHead>Lado B</TableHead>
                  <TableHead>Lado C</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Vertices</TableCell>
                  <TableCell>{triangle.vertices[0]}</TableCell>
                  <TableCell>{triangle.vertices[1]}</TableCell>
                  <TableCell>{triangle.vertices[2]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Angulos</TableCell>
                  <TableCell>{triangle.angles[0]}°</TableCell>
                  <TableCell>{triangle.angles[1]}°</TableCell>
                  <TableCell>{triangle.angles[2]}°</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default TriangleCalculator
