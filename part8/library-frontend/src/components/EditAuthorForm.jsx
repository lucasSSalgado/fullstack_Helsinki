/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries/query"


const EditAuthorForm = ({ authors }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
    })

    useEffect(() => {
        if (authors.length > 0) {
            setName(authors[0].name)
        }
    }, [authors])

    const handleSubmit = (e) => {
        e.preventDefault()
        editAuthor({ variables: { name, setBornTo: Number(born) }})
        setBorn('')
        setName('')
    }

    return (
        <div>
            <h2>Set Birthdate</h2>
            <form onSubmit={ handleSubmit }>
                <select value={name} onChange={(e) => setName(e.target.value)}> 
                    { authors.map(a => {
                        return <option key={a.id} value={a.name}>{a.name}</option> 
                    }) }
                </select> <br />
                <input type="number" name="born" value={born} onChange={({ target }) => setBorn(target.value)} /> <br />
                <button>Update author</button>
            </form>
        </div>
    )
}

export default EditAuthorForm