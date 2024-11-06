import { useState } from 'react';
import useCreateGame from "../hooks/useCreateGame";
import { Route, Routes, useNavigate } from "react-router-dom";

export default function PlayerCreation() {
    const [newName, setNewName] = useState('');
    const [gameName, setGameName] = useState('');
    const [players, setPlayers] = useState([]);
    const { createGame } = useCreateGame();
    const navigate = useNavigate();

    const handleAddPlayer = () => {
        if (newName.trim()) {
            setPlayers([...players, newName]);
            setNewName('');
        }
    };

    const handleCreateGame = () => {
        createGame(players, gameName)
            .then((result) => {
                navigate("/playGame", { state: { result} });
            })
            .catch((error) => {
                console.error("Game creation failed:", error);
            });
    };

    return (
        <div>
            <h2>Liste des joueurs</h2>

            <input
                type="text"
                placeholder="nom de la partie"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Entrer le nom"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleAddPlayer}>+ joueur</button>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>
                        {player}
                    </li>
                ))}
            </ul>
            <button onClick={handleCreateGame}>Créer la Game</button>
        </div>
    );
};