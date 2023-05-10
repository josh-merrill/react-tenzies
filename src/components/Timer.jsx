import React, { useState, useEffect } from "react"

export default function Timer({ gameStatus, tenzies }) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval
    if (gameStatus) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    } else if (tenzies) {
      clearInterval(interval)
    } else {
      setTime(0)
    }
    return () => clearInterval(interval)
  }, [gameStatus, tenzies])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const milliseconds = Math.floor((time % 1000) / 10)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}` // modified this line
  }

  return (
    <>
      <h2 className="dice-timer">{formatTime(time)}</h2>
    </>
  )
}
