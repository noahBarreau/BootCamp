import RowPlayer from './RowPlayer'

const players = [
    {
        id: 1,
        score: 0,
        name: "toto",
    },
    {
        id: 2,
        score: 1000,
        name: "test",
    }
]

export default function TablePlayer({ players }) {
    var htmlBody = players.map((player) => (
        <RowPlayer player={player} />
    ));

    return (
        <table>
            <caption>
                Player
            </caption>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Score</th>
                    <th scope="col">Id</th>
                </tr>
            </thead>
            <tbody>
                {htmlBody}
            </tbody>
        </table>
    );
}