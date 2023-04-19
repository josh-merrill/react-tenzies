import React from "react"

export default function Diecount({count}) {
    return (
        <div className="dice-count-container">
            <h2 className="dice-timer">Time Elasped</h2>
            <h3 className="dice-count">Dicerolls: {count}</h3>
        </div>
    )
}
