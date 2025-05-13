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

export async function createAppointment(date: string, time: string, notes: string, entrepreneurId: string, token: string) {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ 
            entrepreneurId,
            date,
            time,
            notes,
            status: 'confirmed',
        }),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erro ao buscar empreendedor')
    }

    return await response.json()
}


export async function findAppointmentsByDate(slug: string, date: string, token: string) {
  const response = await fetch(
    `${API_BASE_URL}/appointments/hours?entrepreneurId=${slug}&date=${date}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao buscar agendamentos');
  }

  return await response.json();
}
