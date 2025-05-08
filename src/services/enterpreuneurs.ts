import { API_BASE_URL } from "."

export async function getEntrepreneurBySlug(slug: string) {
    const response = await fetch(`${API_BASE_URL}/entrepreneurs/slug/${slug}`)

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erro ao buscar empreendedor')
    }

    return await response.json()
}

export async function registerEntrepreneur(data: {
    userId: string
    businessName: string
    themeColor: string
    logoUrl: string
    description: string
    availableDays: string[]
    availableHours: string[]
    services: { name: string; duration: number; price: number }[]
}) {
    const response = await fetch(`${API_BASE_URL}/entrepreneurs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erro ao criar empresa')
    }

    return await response.json()
}


export async function findEntrepreneursByTag(q: string, token: string) {
    const response = await fetch(`${API_BASE_URL}/entrepreneurs/search?q=${q}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erro ao buscar empreendedor')
    }

    return await response.json()
}