import { useEffect, useState } from 'react'
import Diaries from './components/Diaries'
import { getAllDiaries } from './service/diaries'
import { DiaryEntry } from './types'
import DiaryForm from './components/DiaryForm'
import Notification from './components/Notification'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [error, setError] = useState<string | undefined>(undefined)
  const [update, setUpdate] = useState(false)
  
  useEffect(() => {
    const getAllDiaires = async () => {
      const data = await getAllDiaries()
      setDiaries(data)
    }
    getAllDiaires()
  }, [update])

  return (
    <main>
      <h1>Diary Entries</h1>
      <Notification error={error} />
      <DiaryForm setError={setError} setUpdate={setUpdate} update={update}/>
      <Diaries diaries={diaries}/>
    </main>
  )
}

export default App
