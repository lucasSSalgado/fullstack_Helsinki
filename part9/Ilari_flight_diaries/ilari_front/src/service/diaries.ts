import axios, { AxiosError } from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllDiaries = async () => {
    const diaries = await axios.get<DiaryEntry[]>(baseUrl)
    return diaries.data
}

const addDiary = async (diary: NewDiaryEntry): Promise<DiaryEntry | AxiosError> => {
    try {
        const response = await axios.post<DiaryEntry>(baseUrl, diary)
        return response.data
    } catch (error) {
        return error as AxiosError
    }
   
}

export { getAllDiaries, addDiary }