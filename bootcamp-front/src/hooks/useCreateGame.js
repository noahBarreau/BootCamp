export default function useCreateGame() {
    const createGame = (players, gameName) => {
        fetch("http://localhost:8000/apiGame/create_game", {
            method: "POST",
            headers: {
                Accept: "application,/json",
                "Content-Type": "application-json"
            },
            body: JSON.stringify({
                game_name: gameName,
                players: players,
            }),
        }).then((data) => {
            console.log(data);
        })  
        .catch((reason) => {
            console.error(reason);
        });
    };

    return { createGame };
}