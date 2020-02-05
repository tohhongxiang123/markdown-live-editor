import axios from 'axios'
import { useState, useEffect } from 'react'

/**
 * @example const [{isLoading, error, data}, request] = useAxios()
 * const handleSubmit = async e => {
 *  request({
 *      url: '/api/submit',
 *      method: 'post',
 *      data: {name, email, password},
 *      headers: {authorization: `Bearer ${token}`}s
 *  })
 * }
 */
function useAxios() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [config, setConfig] = useState(null)

    useEffect(() => {
        async function fetch() {
            setIsLoading(true)
            setError(null)
    
            try {
                const response = await axios.request(config)
                setData(response.data)
            } catch(e) {
                if (e.response) {
                    let errorMessage = e.response.data.error
                    if (typeof errorMessage !== 'string') errorMessage = JSON.stringify(errorMessage)
    
                    setError(errorMessage)
                } else {
                    setError(e.message)
                }
            } finally {
                setIsLoading(false)
            }
        }
        if (config) fetch()
    }, [config])

    return [{isLoading, error, data}, setConfig]
}

export default useAxios