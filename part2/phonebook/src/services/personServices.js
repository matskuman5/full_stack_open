import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl)

const add = newPerson => axios.post(baseUrl, newPerson)

const _delete = (id) => axios.delete(`${baseUrl}/${id}`)

const update = (id, newPerson) => axios.put(`${baseUrl}/${id}`, newPerson)

export default {
    getAll,
    add,
    _delete,
    update
}