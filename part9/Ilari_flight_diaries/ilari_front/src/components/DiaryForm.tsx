import { useState } from "react"
import { addDiary } from '../service/diaries'
import { Weather, Visibility, NewDiaryEntry } from '../types'
import{ AxiosError } from "axios";

const DiaryForm = ({ setError, setUpdate, update }: 
    {setError: (error: string | undefined) => void, setUpdate: (state: boolean) => void, update: boolean}) => {
    const [data, setDate] = useState('')
    const [visibility, setVisibility] = useState<Visibility | undefined>()
    const [weather, setWeather] = useState<Weather | undefined>()
    const [comment, setComment] = useState('')

    const handleForm = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        const newDiary = {
            date: data,
            weather: weather,
            visibility: visibility,
            comment: comment
        }

        if (!newDiary.date || !newDiary.weather || !newDiary.visibility || !newDiary.comment) {
            setError('All fields are required')
            setTimeout(() => setError(undefined), 5000)
            return
        }

        const resp = await addDiary(newDiary as NewDiaryEntry);
        if (resp instanceof AxiosError) {
            setError(resp.message)
            setTimeout(() => setError(undefined), 5000)
        }

        setDate('')
        setVisibility(Visibility.Good)
        setWeather(Weather.Cloudy)
        setComment('')
        setUpdate(!update)
    }

    return (
        <>
            <h2>Add a Entry</h2>
            <form onSubmit={ handleForm }>
                <label htmlFor="date">Date </label>
                <input type="date" name="date" onChange={(event) => setDate(event.target.value)} /> <br />

                <label htmlFor="visibility">visibility: </label>
                great <input type="radio" name="visibility" onChange={() => setVisibility(Visibility.Great)} />
                good <input type="radio" name="visibility" onChange={() => setVisibility(Visibility.Good)} />
                ok <input type="radio" name="visibility" onChange={() => setVisibility(Visibility.Ok)} />
                poor <input type="radio" name="visibility" onChange={() => setVisibility(Visibility.Poor)} />

                <br />
                <label htmlFor="weather">weather: </label> 
                sunny <input type="radio" name="weather" onChange={() => setWeather(Weather.Sunny)} />
                rainy <input type="radio" name="weather" onChange={() => setWeather(Weather.Rainy)} />
                cloudy <input type="radio" name="weather" onChange={() => setWeather(Weather.Cloudy)} />
                stormy <input type="radio" name="weather" onChange={() => setWeather(Weather.Stormy)} />
                windy <input type="radio" name="weather" onChange={() => setWeather(Weather.Windy)} />

                <br />
                <label htmlFor="comment">Comment: </label> 
                <input type="text" name="comment" id="comment" onChange={(e) => setComment(e.target.value)}/>

                <br />
                <button type="submit">add</button>
            </form>
        </>
    )
}

export default DiaryForm