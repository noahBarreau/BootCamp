export default function NewGame(){
    return <>
    <h1>Home</h1>
    <input type="text" id="gameName" name="gameName" />
    <button onClick={()=>createGame()}></button>
    </>
}