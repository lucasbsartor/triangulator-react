import { useState } from 'react'
import { z } from 'zod'
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
  CardHeader,
  CardTitle,
} from './ui/card'
import { useToast } from './ui/use-toast'
import Results from './Results'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'

const triangleFormSchema = z.object({
  sideA: z.coerce
    .number()
    .int()
    .positive({ message: 'Esse campo precisa ser um número maior que 0' }),
  sideB: z.coerce
    .number()
    .int()
    .positive({ message: 'Esse campo precisa ser um número maior que 0' }),
  sideC: z.coerce
    .number()
    .int()
    .positive({ message: 'Esse campo precisa ser um número maior que 0' }),
})

const TriangleCalculator = () => {
  const [triangle, setTriangle] = useState<Triangle | null | undefined>()
  const { toast } = useToast()

  const triangleForm = useForm<z.infer<typeof triangleFormSchema>>({
    resolver: zodResolver(triangleFormSchema),
    defaultValues: {
      sideA: 0,
      sideB: 0,
      sideC: 0,
    },
  })

  const onSubmit = (values: z.infer<typeof triangleFormSchema>) => {
    const { sideA, sideB, sideC } = values
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
        <CardContent>
          <Form {...triangleForm}>
            <form
              onSubmit={triangleForm.handleSubmit(onSubmit)}
              className="space-y-2"
            >
              <FormField
                control={triangleForm.control}
                name="sideA"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lado A</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Esse é um lado do triangulo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={triangleForm.control}
                name="sideB"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lado B</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Esse é um lado do triangulo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={triangleForm.control}
                name="sideC"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lado C</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Esse é um lado do triangulo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Calcular</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <br />
      {triangle && <Results triangle={triangle} />}
    </>
  )
}

export default TriangleCalculator
