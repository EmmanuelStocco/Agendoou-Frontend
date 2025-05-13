import { useRouter } from 'next/router';
import { use, useEffect, useState } from 'react';
import { findUserByToken } from '@/services/user';
import { createAppointment } from '@/services/appointments';
import { findAppointmentsByDate } from '@/services/appointments';
import { findEntrepreneursHours } from '@/services/enterpreuneurs';


export default function SchedulePage() {
  const router = useRouter()
  const { slug } = router.query
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [availableHours, setAvailableHours] = useState<any>(null);
  const [bookedHours, setBookedHours] = useState<string[]>([]);
  const [finalHours, setFinalHours] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
    if (!slug) return
    const fetchAvailableHours = async () => {
      const tokenStorage = localStorage.getItem('token');
      setToken(tokenStorage)
      try {
        const { availableHours } = await findEntrepreneursHours(
          String(slug),
          date,
          String(tokenStorage)
        );
        console.log('availableHours', availableHours);
        setAvailableHours([...availableHours]);
      } catch (error) {
        console.error('Erro ao buscar horários disponíveis:', error);
      }
    };

    fetchAvailableHours();
  }
    , [slug]);

  useEffect(() => {
    if (!date) return;

    const fetchAppointments = async () => {
      try {
        const { appointments } = await findAppointmentsByDate(
          String(slug),
          date,
          String(token)
        );
        const hours = appointments[0].map((a: any) => a.time);
        setBookedHours(hours);
      } catch (error) {
        console.error('Erro ao buscar horários agendados:', error);
      }
    };
    fetchAppointments();
    console.log('dategg', date)
  }, [date]);




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!token) {
        router.push('/login');
        return;
      }
      const res = await createAppointment(date, time, notes, String(slug!), token);
      if (!res) {
        alert('Erro ao criar agendamento');
        return;
      }
      alert('Agendamento realizado com sucesso!');
      router.push('/profile');
    } catch (err) {
      console.error(err);
      alert('Erro ao agendar');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">Agendar Atendimento</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Data:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setTime('');
            }}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Hora:</label>
          {/* <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Selecione um horário</option>

            {!!availableHours && availableHours.map((hour: string) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select> */}
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Selecione um horário</option>

            {!!availableHours && availableHours.map((hour: string) => {
              const isBooked = bookedHours.includes(hour);

              return (
                <option
                  key={hour}
                  value={hour}
                  disabled={isBooked}
                >
                  {hour} {isBooked ? ' (Indisponível)' : ''}
                </option>
              );
            })}
          </select>


        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Notas (opcional):</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Confirmar Agendamento
        </button>
      </form>
    </div>
  );
}
