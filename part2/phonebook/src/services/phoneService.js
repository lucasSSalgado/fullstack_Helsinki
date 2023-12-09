import axios from 'axios'
const url = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(url)
    return request.then(resp => resp.data)
}

const savePhone = (phone) => {
    const request = axios.post(url, phone)
    return request.then(resp => resp.data)
}

const deleteById = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(resp => resp.data)
}

const updateNumber = (id, newObj) => {
    const request = axios.put(`${url}/${id}`, newObj)
    return request.then(resp => resp.data)
}

export default { getAll, savePhone, deleteById, updateNumber } 