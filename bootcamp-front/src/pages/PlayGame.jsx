import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import RowPlayer from '../components/RowPlayer'

export default function PlayGame(){
    let location = useLocation();
    const [players, setPlayers] = useState(location.state.result.players);
    const [playerThatPlay, setTextPlayerName] = useState("Toto");
    const [turn, setTurn] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [diceAmount, setdiceAmount] = useState(1);

    const changeText = () => {
        if((turn+1)<=players.length){
            setTextPlayerName(players[turn].name);
            setTurn(turn+1)
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    
    const handleDiceSelection = (amount) => {
        setdiceAmount(amount);
        setDropdownOpen();
    };

    return <>
        <h1 >{playerThatPlay}</h1>
        <button onClick={changeText}>Finir le Tour</button>

        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropbtn">Choix des dés</button>
            {dropdownOpen && (
                <div className="dropdown-content">
                    <button onClick={() => handleDiceSelection(1)}>1 Dé</button>
                    <button onClick={() => handleDiceSelection(2)}>2 Dés</button>
                    <button onClick={() => handleDiceSelection(3)}>3 Dés</button>
                </div>
            )}
        </div>
        <p>{diceAmount} {diceAmount === 1 ? "dé sélectionné" : "dés sélectionnés"}</p>

            <table>
                <caption>
                    ScoreBoard
                </caption>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <RowPlayer key={player.id} player={player} />
                    ))}
                </tbody>
            </table>
    </>
}