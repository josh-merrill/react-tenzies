import React, { useState, useEffect } from "react"
import Die from "./components/Die"
import Dicecount from "./components/Dicecount"
import Timer from "./components/Timer"
import Confetti from "react-confetti"
import { nanoid } from "nanoid"

export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)
  const [gameStatus, setGameStatus] = useState(false)


  useEffect(() => {
    const isAnyDiceHeld = dice.some((die) => die.isHeld)
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)
    if (isAnyDiceHeld && !allHeld) {
      setGameStatus(true)
    } else if (allHeld && allSameValue) {
      setTenzies(true)
      setGameStatus(false)
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setCount(count + 1)
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie()
        })
      )
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  function resetGame() {
    setDice(allNewDice())
    setTenzies(false)
    setCount(0)
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="title-container">
        <h1 className="title">Tenzies</h1>
      </div>
      <div className="tenzies-container">
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-count-container">
          <Timer
          tenzies={tenzies}
          gameStatus={gameStatus}
          // updateLowestTime={updateLowestTime}
          />
          <Dicecount count={count} />
        </div>
        <div className="dice-container">{diceElements}</div>
          {tenzies ?
          <button className="tenzies-button" onClick={resetGame}>
            Reset
          </button> :
          <button className="tenzies-button" onClick={rollDice}>
            Roll
          </button> }
      </div>
    </main>
  )
}
