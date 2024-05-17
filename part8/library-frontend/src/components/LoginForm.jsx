import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries/query'

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login ] = useMutation(LOGIN)

    const handleLogin = async (event) => {
        event.preventDefault()
        const user = await login({ variables: { username, password } })
        localStorage.setItem('user', JSON.stringify(user.data.login))
        props.setUser(user.data.login)
    }

    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={ handleLogin }>
                <div>
                    username
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}


export default LoginForm