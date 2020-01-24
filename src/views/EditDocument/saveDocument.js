import axios from 'axios'

async function saveDocument(_id, changes) {
    const response = await axios.request({
        url: `/api/documents/_id/${_id}`,
        method: 'post',
        data: changes
    })

    return response.data
}

export default saveDocument