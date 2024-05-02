import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote)
    const dispatch = useDispatch()

    const orderByLike = (anecdotesArray) => {
        return anecdotesArray.sort((a, b) => b.votes - a.votes)
    }

    let ordered = orderByLike(anecdotes)

    const vote = (id) => {
        dispatch(voteAnecdote(id))
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