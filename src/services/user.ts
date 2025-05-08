import { API_BASE_URL } from "."

export async function registerUser(data: {
    name: string
    email: string
    password: string
    role: 'client' | 'entrepreneur'
}) {
    const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erro ao criar usuário')
    }

    return await response.json()
}

export async function findUserByToken(token: string) { 
    const response = await fetch(`${API_BASE_URL}/auth/findOneByToken`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erro ao criar usuário')
    }

    return await response.json()
}