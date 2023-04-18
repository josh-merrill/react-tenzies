import React from "react"

export default function Diecount(props) {
    return (
        <div className="dice-count-container">
            <h2 className="dice-timer">Time Elasped</h2>
            <h3 className="dice-count">Dicerolls: {props.count}</h3>
        </div>
    )
}