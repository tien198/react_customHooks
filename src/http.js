import { serverUrl } from './env.json';

export async function fetchAvailablePlaces() {
    const respond = await fetch(`${serverUrl}/places`)
    const resData = await respond.json()
    if (!respond.ok) {
        throw new Error('Fail to fetch available places')
    }
    return resData.places
}

export async function fetchUserPlaces() {
    const respond = await fetch(`${serverUrl}/user-places`)
    const resData = await respond.json()
    if (!respond.ok) {
        throw new Error('Fail to fetch user places')
    }
    return resData.places
}

export async function updateUserPlaces(places) {
    const respond = await fetch(`${serverUrl}/user-places`, {
        method: 'PUT',
        body: JSON.stringify({ places }),
        headers: {
            'Content-type': 'application/json'
        }
    })

    if (!respond.ok)
        throw new Error('Can\'t update places')
    const resData = await respond.json()
    return resData.message
}
