import { serverUrl } from './env.json';

export async function fetchPlaceFromServer() {
    const respond = await fetch(`${serverUrl}/places`)
    const resData = await respond.json()
    if (!respond.ok) {
        throw new Error('dfadfs')
    }
    return resData.places
}