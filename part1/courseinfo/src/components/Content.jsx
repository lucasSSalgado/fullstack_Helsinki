import Part from "./Part"

const Content = (props) => {
    return  (
        <main>
            <Part p={props.data.parts[0]} />
            <Part p={props.data.parts[1]} />
            <Part p={props.data.parts[2]} />
        </main>
    )
}

export default Content