export default function Persons(props) {
    if (!props.array) {
        return null
    }
    
    return (
        <>
            {props.array.map(p => ( 
                <li key={p.id}> 
                    {p.name} {p.number} 
                    <button onClick={() => props.deleteById(p.id, p.name)}> 
                        Delete
                    </button>
                </li> 
            ))}
        </>        
    )
}