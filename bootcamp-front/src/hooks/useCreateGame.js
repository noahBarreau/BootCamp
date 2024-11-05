function useCreateGame(){

    const createGame = ()=> {
        fetch("http://127.0.0.1:8000/apiGame/create_game/",{
            method : "POST",
            body:{
                name: "game",
                players: [
                    "toto",
                    "tata"
                ]
            }
        }).then((response)=>{
            console.log(response)
        }).catch((reason)=>{
            console.error(reason)
        })
    }
}