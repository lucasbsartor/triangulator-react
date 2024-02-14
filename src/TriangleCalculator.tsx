import React, { useState } from 'react'
import { Triangle, getTriangleType, getTriangleAngles } from './triangle'

const TriangleCalculator = () => {
  const [sideA, setsideA] = useState<number>(0)
  const [sideB, setsideB] = useState<number>(0)
  const [sideC, setsideC] = useState<number>(0)
  const [triangle, setTriangle] = useState<Triangle | null | undefined>()
  const [showInvalidMessage, setShowInvalidMessage] = useState<boolean>(false)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    handleClear()
    const triangleType = getTriangleType(sideA, sideB, sideC)
    const triangleAngles = getTriangleAngles(sideA, sideB, sideC)

    if (triangleAngles === 'invalid' || triangleType === 'invalid') {
      return setShowInvalidMessage(true)
    }
    showInvalidMessage && setShowInvalidMessage(false)
    setTriangle({
      type: triangleType,
      angles: triangleAngles,
      vertices: [sideA, sideB, sideC],
    })
  }

  const handleClear = () => {
    setsideA(0)
    setsideB(0)
    setsideC(0)
    setShowInvalidMessage(false)
    setTriangle(null)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <h3>Insira os lados do triângulo:</h3>
          <label htmlFor="lado1">Lado 1:</label>
          <input
            value={sideA}
            onChange={(e) => setsideA(e.target.valueAsNumber)}
            type="number"
            pattern="[1-9]"
            id="lado1"
          />
          <br />
          <label htmlFor="lado2">Lado 2:</label>
          <input
            value={sideB}
            onChange={(e) => setsideB(e.target.valueAsNumber)}
            type="number"
            pattern="[1-9]"
            id="lado2"
          />
          <br />
          <label htmlFor="lado3">Lado 3:</label>
          <input
            value={sideC}
            onChange={(e) => setsideC(e.target.valueAsNumber)}
            type="number"
            pattern="[1-9]"
            id="lado3"
          />
        </div>
        <button className="btn">Testar</button>
      </form>
      <button className="btn" onClick={handleClear}>
        Limpar
      </button>
      <br />
      {showInvalidMessage && <h1 className="error">Triangulo Invalido</h1>}
      {triangle && (
        <div>
          <h4>Tipo: Triangulo {triangle.type}</h4>
          <h4>
            Lados:{' '}
            {`${triangle.vertices[0]} ${triangle.vertices[1]} ${triangle.vertices[2]}`}
          </h4>
          <h4>
            Angulos:{' '}
            {`${triangle.angles[0]}° ${triangle.angles[1]}° ${triangle.angles[2]}°`}
          </h4>
        </div>
      )}
    </>
  )
}

export default TriangleCalculator
