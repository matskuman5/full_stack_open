import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl)

const add = newPerson => axios.post(baseUrl, newPerson)

const _delete = (id) => axios.delete(`${baseUrl}/${id}`)

export default {
    getAll,
    add,
    _delete
}