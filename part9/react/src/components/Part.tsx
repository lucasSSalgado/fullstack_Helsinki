import { CoursePart } from "../types"

const Part = ({ course }: { course: CoursePart}) => {

    switch (course.kind) {
        case "basic":
            return (
                <div>
                    <h4>
                        {course.name} {course.exerciseCount}
                    </h4>
                    <p>
                        {course.description}
                    </p>
                </div>
            )
        case "group":
            return (
                <div>
                    <h4>
                        {course.name} {course.exerciseCount}
                    </h4>
                    <p>
                        projects exercises {course.groupProjectCount}
                    </p>
                </div>
            )
        case "background":
            return (
                <div>
                    <h4>
                        {course.name} {course.exerciseCount}
                    </h4>
                    <p>
                        {course.description}
                    </p>
                    <p>
                        background material: {course.backgroundMaterial}
                    </p>
                </div>
            )
        case "special":
            return (
                <div>
                    <h4>
                        {course.name} {course.exerciseCount}
                    </h4>
                    <p>
                        {course.description}
                    </p>
                    <p>
                        required skills: {course.requirements.join(", ")}
                    </p>
                </div>
            )
        default:
            return (
                <div>Not found</div>
            )
    }
}

export default Part