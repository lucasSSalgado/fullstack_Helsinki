import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const orderByLike = (anecdotesArray) => {
        return anecdotesArray.sort((a, b) => b.votes - a.votes)
    }

    let odered = orderByLike(anecdotes)

    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }

    return (
        <div>
            {odered.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList