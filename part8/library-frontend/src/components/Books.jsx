/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client"
import { BOOK_BY_GENRE, ALL_BOOKS,BOOK_ADDED } from "../queries/query"
import { useEffect, useState } from "react"
import { useSubscription } from "@apollo/client"
import Notify from "./Notification"

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState('')
  const [show, setShow] = useState(false)
  const allBook = useQuery(ALL_BOOKS)
  const result = useQuery(BOOK_BY_GENRE, {
    variables: { genre: filter }
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const newBook = data.data.bookAdded
      const newGenres = new Set(genres)
      newBook.genres.forEach(genre => {
        newGenres.add(genre)
      })
      setGenres([...newGenres])
      allBook.refetch()
      result.refetch()
      setShow(true)

      setTimeout(() => {
        setShow(false)
      }, 5000)
    }
  })

  useEffect(() => {
    if (!allBook.data) return

    let temp = new Set(genres)
    allBook.data.allBooks.forEach(book => {
      book.genres.forEach(genre => {
        if (!temp.has(genre)) {
          temp.add(genre)
        }
      })
    }) 

    setGenres([...temp])
  }, [allBook.data])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      { show && <Notify /> }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          { result.data.booksByGenre.map((a) => {
            return (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )      
          })}
        </tbody>
      </table>

      { genres.length > 0 && genres.map(genre => <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>) }
      <button onClick={() => setFilter('')}>all</button>
    </div>
  )
}

export default Books
