import { useEffect, useState } from 'react'
import axios from 'axios'

function useQuery(query, variables) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [_variables, setVariables] = useState(variables)

    useEffect(() => {
        async function fetch() {
            setIsLoading(true)
            try {
                const response = await axios.request({
                    url: '/graphql',
                    method: 'post',
                    data: {
                        query, 
                        variables: _variables
                    }
                })
                setData(response.data.data)
            } catch(e) {
                console.log(e.response, e.request, e.message)
                if (e.response) {
                    setError(e.response.data.errors[0].message)
                } else {
                    setError(e.message)
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetch()
    }, [query, _variables])

    return {isLoading, error, data}
}

export default useQuery