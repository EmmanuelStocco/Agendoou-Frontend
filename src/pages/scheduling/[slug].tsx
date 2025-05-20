import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { findUserByToken } from '@/services/user';
import { createAppointment } from '@/services/appointments';
import { findAppointmentsByDate } from '@/services/appointments';
import { findEntrepreneursHours } from '@/services/enterpreuneurs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale';
import { Header } from '@/components/Header';


export default function SchedulePage() {
  const router = useRouter()
  const { slug } = router.query
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [availableHours, setAvailableHours] = useState<any>(null);
  const [bookedHours, setBookedHours] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [availableDays, setAvailableDays] = useState<any>(null);

  useEffect(() => {
    if (!slug) return
    const fetchAvailableHours = async () => {
      const tokenStorage = localStorage.getItem('token');
      setToken(tokenStorage)
      try {
        const { availableHours, availableDays } = await findEntrepreneursHours(
          String(slug),
          date,
          String(tokenStorage)
        );
        console.log('availableHours', availableHours);
        setAvailableHours([...availableHours]);
        setAvailableDays([...availableDays]);
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
  }, [date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!token) {
        router.push('/login');
        return;
      }

      console.log('date', date);
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
    <>
      <Header />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-4">Agendar Atendimento</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CALENDARIO */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Data:</label>
            <DatePicker
              selected={date ? new Date(date + 'T00:00:00') : null}
              onChange={(d) => {
                if (!d) return;

                // Corrige para o fuso local sem usar toISOString
                const localDate = new Date(d);
                const year = localDate.getFullYear();
                const month = String(localDate.getMonth() + 1).padStart(2, '0');
                const day = String(localDate.getDate()).padStart(2, '0');
                const formatted = `${year}-${month}-${day}`;
                console.log('formatted', formatted);
                setDate(formatted);
                setTime('');
              }}
              filterDate={(date) => {
                if (!availableDays || !Array.isArray(availableDays)) return false;

                const mapDay = {
                  Domingo: 0,
                  Segunda: 1,
                  Terça: 2,
                  Quarta: 3,
                  Quinta: 4,
                  Sexta: 5,
                  Sábado: 6,
                };

                const allowedDays = availableDays.map((d: string) => mapDay[d as keyof typeof mapDay]);
                const weekday = date.getDay();
                return allowedDays.includes(weekday);
              }}
              locale={ptBR}
              minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
              placeholderText="Selecione uma data disponível"
              className="w-full border px-3 py-2 rounded"
              dateFormat="dd-MM-yyyy"
            />

          </div>

          {/* HORA */}
          {/* <div>
            <label className="block text-gray-700 font-medium mb-1">Hora:</label>
            <select
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
            </select>  
          </div> */}
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Confirmar Agendamento
          </button>
        </form>
      </div>
    </>
  );
}
