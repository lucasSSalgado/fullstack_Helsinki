import { useSelector, useDispatch } from 'react-redux'
import { like } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote)
    const dispatch = useDispatch()

    const orderByLike = (anecdotesArray) => {
        return [...anecdotesArray].sort((a, b) => b.votes - a.votes)
    }

    let ordered = orderByLike(anecdotes)

    const vote = (id) => {
        dispatch(like(id))
        const obj = anecdotes.filter(a => a.id == id)
        dispatch(notify(`you voted '${obj[0].content}'`))
    }

    const filtered = useSelector(state => {
        if (state.filter === 'ALL') {
          return ordered;
        } 
        else {
          return ordered.filter(anecdote =>
            anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
          );
        }
    });

    return (
        <div>
            {filtered.map(anecdote =>
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