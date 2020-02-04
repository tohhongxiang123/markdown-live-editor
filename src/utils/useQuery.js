import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'

function useQuery(query, variables) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const variablesString = useMemo(() => JSON.stringify(variables), [variables])

    useEffect(() => {
        const source = axios.CancelToken.source()
        async function fetch() {
            setIsLoading(true)
            try {
                const response = await axios.request({
                    url: '/graphql',
                    method: 'post',
                    data: {
                        query, 
                        variables: JSON.parse(variablesString)
                    },
                    cancelToken: source.token
                })
                setData(response.data.data)
                setIsLoading(false)
            } catch(e) {
                setIsLoading(false)
                if (axios.isCancel(e)) {
                    return
                }

                console.log(e)
                if (e.response && e.response.data.hasOwnProperty('errors')) {
                    setError(e.response.data.errors[0].message)
                } else {
                    setError(e.message)
                }
            }
        }

        fetch()
        return () => source.cancel('Operation cancelled by user')
    }, [query, variablesString])

    return {isLoading, error, data}
}

export default useQuery