import { DiaryEntry } from "../types"

const Diaries = ({ diaries }: {diaries: DiaryEntry[]}) => {
    return (
        <div>
            {
                diaries.map(d => {
                    return (
                        <ul key={d.id}>
                            <h2>{d.date}</h2>
                            <li>visibility: {d.visibility}</li>
                            <li>weather: {d.weather}</li>
                        </ul>
                        
                    )
                })
            }
        </div>
    )
}

export default Diaries