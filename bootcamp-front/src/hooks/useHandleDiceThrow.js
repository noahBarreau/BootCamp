export default function useHandleDiceThrow() {
    const handleDiceThrow = (diceAmount) => {
        return fetch("http://localhost:8000/apiGame/handle_dice_throw", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                diceAmount: diceAmount,
            }) 
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

    return { handleDiceThrow };
}