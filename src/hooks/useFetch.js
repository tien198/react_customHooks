import { useEffect, useState } from "react";

/**
 * use to fetch data from server
 * @param {Function} fetchFn - an async func that return fetched data
 */
export function useFetch(fetchFn, initData) {
    const [data, setData] = useState(initData);
    const [isLoading, setIsLoading] = useState(true)
    const [loadingError, setLoadingError] = useState()


    useEffect(() => {
        async function fetchPlaces() {
            try {
                const places = await fetchFn()
                setData(places)
            }
            catch (error) {
                setLoadingError({ message: error.message })
            }
            setIsLoading(false)
        }

        fetchPlaces()
    }, [])

    return {
        data, setData,
        isLoading, setIsLoading,
        loadingError, setLoadingError
    }
}