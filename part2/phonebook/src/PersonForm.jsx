export default function PersonForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
            name: <input value={props.newName} onChange={(e) => props.setNewName(e.target.value)}/>          
            </div>
            <div>
            number: <input value={props.newNumber} onChange={(e) => props.setNewNumber(e.target.value)} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}