import React, { useState, useEffect } from "react"

export default function Timer({ tenzies }) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval
    if (!tenzies) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    }
    return () => clearInterval(interval)
  }, [tenzies])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
  <h2 className="dice-timer">{formatTime(time)}</h2>
  )
}
