export default function RowPlayer({ player }) {
    return (<tr><th scope="row">{player.name}</th><td>{player.score}</td></tr>)
}