export type Triangle = {
  type: TriangleTypes
  vertices: [number, number, number]
  angles: [number, number, number]
}

type TriangleTypes = 'escaleno' | 'equilatero' | 'isoceles'

export const isValidTriangle = (
  sideA: number,
  sideB: number,
  sideC: number
): boolean => {
  return (
    sideA + sideB < sideC ||
    sideA + sideC < sideB ||
    sideB + sideC < sideA ||
    [sideA, sideB, sideC].includes(0)
  )
}

export const getTriangleType = (
  sideA: number,
  sideB: number,
  sideC: number
): TriangleTypes | 'invalid' => {
  if (isValidTriangle(sideA, sideB, sideC)) {
    return 'invalid'
  }
  if (sideA === sideB && sideB === sideC) {
    return 'equilatero'
  }
  if (sideA === sideB || sideA === sideC || sideB === sideC) {
    return 'isoceles'
  }
  return 'escaleno'
}

export const getTriangleAngles = (
  sideA: number,
  sideB: number,
  sideC: number
): [number, number, number] | 'invalid' => {
  if (isValidTriangle(sideA, sideB, sideC)) {
    return 'invalid'
  }
  const firstAngle = Math.floor(
    Math.acos((sideB ** 2 + sideC ** 2 - sideA ** 2) / (2 * sideB * sideC)) *
      (180 / Math.PI)
  )
  const secondAngle = Math.floor(
    Math.acos((sideA ** 2 + sideC ** 2 - sideB ** 2) / (2 * sideA * sideC)) *
      (180 / Math.PI)
  )
  const thirdAngle = Math.floor(
    Math.acos((sideA ** 2 + sideB ** 2 - sideC ** 2) / (2 * sideA * sideB)) *
      (180 / Math.PI)
  )

  return [firstAngle, secondAngle, thirdAngle]
}
