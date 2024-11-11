import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import useModifScore from "../hooks/useModifScore";
import RowPlayer from '../components/RowPlayer';
import useGetWinners from "../hooks/useGetWinners";
import useAnnounceVar from "../hooks/useAnnounceVar";
import useEndTurn from "../hooks/useEndTurn";
import useHandleDiceThrow from "../hooks/useHandleDiceThrow";


export default function PlayGame(){
    let location = useLocation();
    //const players =location.state.result.players;
    
    const [players, setPlayers] = useState(location.state.result.players);
    const [playerThatPlay, setTextPlayerName] = useState(players[0].name);
    const [turn, setTurn] = useState(0);
    const [score, setScore] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [diceAmount, setdiceAmount] = useState(1);
    const { modifScore } = useModifScore();
    const { getWinners } = useGetWinners();
    const { announceVar } = useAnnounceVar();
    const { handleDiceThrow } = useHandleDiceThrow();
    const { endTurn } = useEndTurn();
    const [resultWinner, setResultWinner] = useState([]);

    /*
    const dataObject = {
        players: players,
        playerThatPlay: players[0].name,
        turn: 0,
        score: 0,
      };

    const data = { ...dataObject };
    announceVar(data);*/

    /*
    const endTurn2 = (results) => {

        if(players[turn].score==0){
            if(Number.isInteger(results)){
                players[turn].score=score+results;
            }else{
                players[turn].score=score;
            }
            modifScore(players[turn].score, players[turn].id)
        }

        if(players[turn+1]!=undefined || players[turn].score==0){
            
            if(Number.isInteger(results)){
                players[turn].score=score+results;
            }else{
                players[turn].score=score;
            }
            modifScore(players[turn].score, players[turn].id)

            if(players[turn+1]!=undefined){
                setTextPlayerName(players[turn+1].name);
                setTurn(turn+1)
            }
        }else {
            getWinners(location.state.result.id)
                .then((result) => {
                    console.log(result);
                    setResultWinner(result);
                })
                .catch((error) => {
                    console.error("Game creation failed:", error);
                });

        }

        setScore(0)

    };
    */

    const sendEndTurn = async () => {
        const result = await endTurn(diceAmount);
        setScore(result.score)
        setTextPlayerName(result.playerThatPlay)
        setPlayers(result.players)
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    
    const handleDiceSelection = (amount) => {
        setdiceAmount(amount);
        setDropdownOpen();
    };

    const sendHandleDiceThrow = async () => {
        const result = await handleDiceThrow(diceAmount);
        console.log(result);
        setScore(result.score)
        setTextPlayerName(result.playerThatPlay)
        /*
        let results = 0;
        for (let i = 0; i < diceAmount; i++) {
            const roll = Math.floor(Math.random() * 6) + 1;
            results = results + roll;
        }
        if(score+results==21){
            alert("BlackJack !");
        }
        setScore(score+results)
        if((score+results)>21){
            endTurn(results);
        }*/
    };

    return <>
        <h1 >joueur actuel : {playerThatPlay}</h1>
        <h1 >score : {score}</h1>
        <button onClick={sendEndTurn}>Finir le Tour</button>

        <button onClick={sendHandleDiceThrow}>Lancer les dés</button>

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

            {resultWinner && resultWinner.length > 0 && (
                <table>
                    <caption>
                        Résultat :
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultWinner.map((item) => (
                            <RowPlayer key={item.player.id} player={item.player} />
                        ))}
                    </tbody>
                </table>
            )}
    </>
}