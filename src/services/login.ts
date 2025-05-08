import { API_BASE_URL } from "."

export async function login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erro ao fazer login')
    }

    return await response.json()
}