import Part from "./Part"

const Content = (props) => {
    let total = props.parts.reduce((acc, cur) => acc + cur.exercises, 0)

    return (
        <>
            {
                props.parts.map(elem => {
                    return <Part key={elem.id} name={elem.name} exercises={elem.exercises}/>
                }
            )}
            <p><strong>total of {total} exercises</strong></p>
        </>        
    )
}

export default Content