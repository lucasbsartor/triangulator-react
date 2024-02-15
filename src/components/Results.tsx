import { Triangle } from '@/lib/triangle'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from './ui/table'

type ResultsProps = {
  triangle: Triangle
}

const Results = ({ triangle }: ResultsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados</CardTitle>
        <CardDescription>Trinangulo {triangle.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Informações do triangulo {triangle.type}</TableCaption>
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
  )
}

export default Results
