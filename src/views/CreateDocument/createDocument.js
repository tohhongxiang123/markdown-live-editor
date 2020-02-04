import axios from 'axios'

/**
 * 
 * @param {Object} document
 * @param {string} document.title
 * @param {string} document.description
 * @param {string} document.body
 * @param {string} document.authorid
 * @param {string} document.childof
 * @param {string} document.pageid
 */
export default async function createDocument({title, description, body, authorid, childof, pageid}, headers) {
    try {
        const response = await axios.request({
            url: '/api/documents/create',
            method: 'post',
            data: {
                title, description, body, authorid, childof, pageid
            },
            headers 
        })

        return {data: response.data}
    } catch(e) {
        if (e.response) return {error: e.response.data.error}
        return {error: e.message}
    }
}