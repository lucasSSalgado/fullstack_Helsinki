import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handlerSubmit = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        dispatch(create(content))
    }

    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={ handlerSubmit }>
            <div>
            <input type='text' name='content'/>
            </div>
            <button>create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm