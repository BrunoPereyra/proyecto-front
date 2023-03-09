import axios from "axios"
const baseUrl = 'http://localhost:3001'
var token = null

const setToken = (newObject) => {
    token = newObject
}
const createUser = async (newObject) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }
    const res = await axios.post(`${baseUrl}/signup`, newObject, config)
    return res
}
const LoginUser = async (newObject) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }
    const res = await axios.post(`${baseUrl}/login`, newObject, config)
    return res
}
const searchRefService = async (newObject) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }

    const filter = newObject.filter
    const data = { filter };

    const res = await axios.post(
        `${baseUrl}/services${newObject.query}`,
        data,
        config
    )
    return res
}
const ProfileGet = async (newObject) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }

    const res = await axios.get(
        `${baseUrl}/ProfileGet`,
        config
    )
    return res
}

const GetNotes = async (newObject) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }

    const res = await axios.get(
        `${baseUrl}/GetNotes`,
        config
    )
    return res
}

const createServiceBasic = async (formData) => {

    const config = {
        headers: {
            "Authorization": `bearer ${token}`,
            "Content-Type": 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post(
            `${baseUrl}/createServiceBasic`,
            formData,
            config
        )
        return res

    } catch (error) {
        return error
    }

}

const exportedObject = {
    createUser,
    LoginUser,
    setToken,
    searchRefService,
    ProfileGet,
    GetNotes,
    createServiceBasic
}
export default exportedObject