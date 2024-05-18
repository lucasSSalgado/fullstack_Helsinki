/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client"
import { BOOK_BY_GENRE } from "../queries/query"
import { useEffect,useState } from "react"

const Recommended = (props) => {
    const favorite = props.favoriteResult?.data?.me?.favoriteGenre
    const result = useQuery(BOOK_BY_GENRE, {
        variables: { genre: favorite }
    })

    const [books, setBooks] = useState([])

    useEffect(() => {
        if (!result.data) return
        setBooks(result.data.booksByGenre)
    }, [result.data])

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
            <h4>books in your favorite genre {favorite}</h4>

            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>born</th>
                    <th>published</th>
                </tr>   
                {books.map((a) => (
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