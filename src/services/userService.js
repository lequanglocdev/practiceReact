import axios from "./customize-axios";

const fetchApiUser = (page) => {
    return axios.get(`/api/users?page=${page}`)

}
const postApiUser = (name, job) => {
    return axios.post("/api/users", { name: name, job: job })
}
const putUpdateUser = (name, job) => {
    return axios.put("/api/users/2", { name, job })
}
export { fetchApiUser, postApiUser, putUpdateUser };