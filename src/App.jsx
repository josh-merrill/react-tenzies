import Reac, { useState, useEffect } from "react"
import Die from "./Die"
import Dicecount from "./Dicecount"
import Timer from "./Timer"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
// import Star from "./assets/star.png"

export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
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
    for (let i = 0 i < 10 i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setCount(count + 1)
      console.log(count)
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie()
        })
      )
    } else {
      setCount(0)
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
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
    // <div className="tenzies-wrapper">
    //   <div className="image-top-star">
    //     <img src={Star} />
    //   </div>
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
            <Timer tenzies={tenzies} />
            <Dicecount count={count} />
          </div>
          <div className="dice-container">{diceElements}</div>
          <button className="roll-dice" onClick={rollDice}>
            {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
      </main>
    //   <div className="image-bottom-star">
    //     <img src={Star} />
    //   </div>
    // </div>
  )
}
