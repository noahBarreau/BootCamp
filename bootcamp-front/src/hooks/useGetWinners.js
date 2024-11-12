export default function useGetWinners(){
    const getWinners = () => {
        return fetch("http://localhost:8000/apiGame/get_winners", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
        
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Winners retrieved:", data);
            return data;
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            throw error;
        });
    };

    return { getWinners };
}