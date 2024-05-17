/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client"
import { FAVORITE } from "../queries/query"

const Recommended = (props) => {
    const result = useQuery(FAVORITE)

    if (!props.show) {
        return null
    }
    if (result.loading) {
        return <div>loading...</div>
    }
    if (result.error) {
        return <div>{result.error.message}</div>
    }

    return (
        <div>
            <h2>recommendations</h2>
            <h4>books in your favorite genre {result.data.me.favoriteGenre}</h4>

            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>born</th>
                    <th>published</th>
                </tr>   
                {result.data.allBooks.map((a) => (
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommended