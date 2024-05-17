/* eslint-disable react/prop-types */
import {  useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries/query'
import EditAuthorForm from './EditAuthorForm'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { props.user && <EditAuthorForm authors={result.data.allAuthors} user={props.user} /> }    
    </div>
  )
}

export default Authors
