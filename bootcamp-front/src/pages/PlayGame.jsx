import { useLocation } from 'react-router-dom';

export default function PlayGame(){
    let location = useLocation();
    console.log(location)
    console.log(location.state)
    console.log(location.state.result)
    return <>
    <h1>{location.state.gameName}</h1>
    </>
}