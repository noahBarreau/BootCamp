import { useState } from "react";

export default function CounterButton({ name }) {

    function addPlayer() {
        const inputPlayer = document.getElementById("inputPlayer").value;
        console.log("result")
        console.log(inputPlayer)
    }

    return (
        <div>
            <input type="text" id="inputPlayer" name="name" />
            <input type="button" value="Ajouter" onClick={addPlayer} />
            <p id="test"></p>
            <ul>
                {lignes.map((item, index) => (
                    <li key={index}>
                        {player.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}