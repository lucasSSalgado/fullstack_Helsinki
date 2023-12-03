import Course from "./Course"

const CoursesList = (props) => {
    return (
        <div>
            {
                props.courses.map(course => {
                    return <Course course={course} />
                })
            }
        </div>
    )
}

export default CoursesList