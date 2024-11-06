import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import RowPlayer from '../components/RowPlayer'

export default function PlayGame(){
    let location = useLocation();
    const [players, setPlayers] = useState(location.state.result.players);
    const [playerThatPlay, setTextPlayerName] = useState(players[0].name);
    const [turn, setTurn] = useState(0);
    const [score, setScore] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [diceAmount, setdiceAmount] = useState(1);

    const endTurn = () => {
        players[turn].score=score;
        if((turn+1)<=players.length){
            setScore(0)
            setTextPlayerName(players[turn+1].name);
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

    const handleDiceThrow = () => {
        let results = 0;
        for (let i = 0; i < diceAmount; i++) {
            const roll = Math.floor(Math.random() * 6) + 1;
            results = results + roll;
        }
        setScore(score+results)
        if((score+results)>21){
            endTurn();
        }
    };

    return <>
        <h1 >joueur actuel : {playerThatPlay}</h1>
        <h1 >score : {score}</h1>
        <button onClick={endTurn}>Finir le Tour</button>

        <button onClick={handleDiceThrow}>Lancer les dés</button>

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