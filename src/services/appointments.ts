import { API_BASE_URL } from "."

export async function deleteAppointment(id: string, token: string) {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erro ao buscar empreendedor')
    }

    return await response.json()
}