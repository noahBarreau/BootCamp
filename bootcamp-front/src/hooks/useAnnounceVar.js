export default function useAnnounceVar() {
    const announceVar = (data) => {
        return fetch("http://localhost:8000/apiGame/announce_var", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) 
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

    return { announceVar };
}