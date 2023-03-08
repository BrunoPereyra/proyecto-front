import axios from "axios"
const baseUrl = 'http://localhost:3001'
var token = null

const setToken = (newObject) => {
    token = newObject
}

const createsubscripcion = async () => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }
    const res = await axios.post(`${baseUrl}/subscription`, {}, config)
    console.log(res)
    // con lo que se trae de res es la URL que tenemos que redireccionar al usuario para pagar
    return res
}

const statusSubscripcion = async (collection_id) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }
    // el newObject son los parametros del query que recibe nuestro back_urls que redirecciona 
    // mercado pago con estos params que tenen que ir a subscriptionStatus losparam son
    // collection_id, collection_status, external_reference
    const res = await axios.get(
        `${baseUrl}/subscriptionStatus?collection_id=${collection_id}`,
        config
    )
    return res
}

const exportedObject = {
    setToken,
    createsubscripcion,
    statusSubscripcion
}
export default exportedObject