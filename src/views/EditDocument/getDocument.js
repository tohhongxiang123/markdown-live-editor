import axios from 'axios'

async function getDocument(_id) {
    const response = await axios.request({
        url: `/api/documents/_id/${_id}`,
        method: 'get',
    })

    if (response.data.hasOwnProperty('error')) {
        throw new Error(response.data.error)
    }

    return response.data[0]
}

export default getDocument