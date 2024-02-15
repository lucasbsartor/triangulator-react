import {
  getTriangleType,
  getTriangleAngles,
  isValidTriangle,
} from '@/lib/triangle'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from './ui/use-toast'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useAtom } from 'jotai'
import { triangleAtom } from './triangleAtom'

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

const TriangleForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [triangle, setTriangle] = useAtom(triangleAtom)

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
              <FormDescription>Esse é um lado do triangulo</FormDescription>
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
              <FormDescription>Esse é um lado do triangulo</FormDescription>
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
              <FormDescription>Esse é um lado do triangulo</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Calcular</Button>
      </form>
    </Form>
  )
}

export default TriangleForm
