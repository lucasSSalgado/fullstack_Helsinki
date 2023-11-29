const Total = (props) => {
    const exercises = props.data.parts
    let total = 0
    exercises.forEach(element => {
        total += element.exercises
    });
    return (
        <>
            <p>Number of exercises {total}</p>
        </>
    )
}

export default Total