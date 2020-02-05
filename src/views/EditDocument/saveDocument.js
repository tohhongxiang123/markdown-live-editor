import axios from 'axios'

async function saveDocument(_id, changes, headers) {
    try {
        const response = await axios.request({
            url: `/api/documents/_id/${_id}`,
            method: 'post',
            data: changes,
            headers
        })

        return {data: response.data}
    } catch(e) {
        if (e.response) return {error: e.response.data.error}
        return {error: e.message}
    }
}

export default saveDocument