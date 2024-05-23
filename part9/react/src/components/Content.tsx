import Part from "./Part";
import { CoursePart } from "../types";


const Content = ({ courses }: { courses: CoursePart[] }) => {
    return (
        <div>
            {
                courses.map((course: CoursePart) => <Part key={course.name} course={course} />)
            }
        </div>
    );
}

export default Content