export default function useEntTurn(){
    const endTurn = (score, id) => {
        return fetch("http://localhost:8000/apiGame/end_turn", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "score": score,
                "player_id": id
              }),
        })
        
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            throw error;
        });
    };

    return { endTurn };
}