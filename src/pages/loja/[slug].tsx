import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getEntrepreneurBySlug } from '@/services/authService' // ajuste o caminho

type Entrepreneur = {
  id: number
  businessName: string
  themeColor: string
  logoUrl: string
  description: string
  availableDays: string[]
  availableHours: string[]
  services: string[]
  slug: string
  user: {
    name: string
    email: string
  }
}

const weekdayMap: Record<string, number> = {
  domingo: 0,
  segunda: 1,
  terça: 2,
  quarta: 3,
  quinta: 4,
  sexta: 5,
  sábado: 6,
}

export default function LojaPage() {
  const router = useRouter()
  const { slug } = router.query
  const [data, setData] = useState<Entrepreneur | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    if (!slug) return
  
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getEntrepreneurBySlug(String(slug))
        setData(data)
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
      } finally {
        setLoading(false)
      }
    }
  
    fetchData()
  }, [slug])
  

  if (loading) return <p className="text-center mt-10 text-gray-500">Carregando...</p>
  if (!data) return <p className="text-center mt-10 text-red-500">Empreendimento não encontrado.</p>

  const allowedWeekdays = data.availableDays.map(dia => weekdayMap[dia.toLowerCase()])
  const isDayAvailable = (date: Date) => allowedWeekdays.includes(date.getDay())

  return (
    <div className="min-h-screen bg-gray-50" style={{ borderTop: `6px solid ${data.themeColor}` }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
       {/* Header */}
       <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 py-8 px-6 rounded-xl" style={{ backgroundColor: data.themeColor }}>
          <img src={data.logoUrl} alt={data.businessName} className="w-28 h-28 object-cover rounded-xl shadow-md" />
          <div className="text-white">
            <h1 className="text-4xl font-extrabold">{data.businessName}</h1>
            <p className="mt-2">{data.description}</p>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6 border-l-4" style={{ borderColor: data.themeColor }}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Serviços oferecidos</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {data.services.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>

        {/* Availability */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6 border-l-4" style={{ borderColor: data.themeColor }}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Disponibilidade</h2>
          <p className="text-gray-700"><strong>Dias:</strong> {data.availableDays.join(', ')}</p>
          <p className="text-gray-700"><strong>Horários:</strong> {data.availableHours.join(', ')}</p>
        </div>

        {/* Agendamento */}
        <div className="bg-white rounded-2xl shadow p-6 border-l-4" style={{ borderColor: data.themeColor }}>
        <Link href="/login">
        <button
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Agendar Atendimento
        </button>
      </Link>          {/* <p className="text-gray-600 mb-4">Selecione um dia disponível:</p> */}

          {/* <div className="flex justify-center mb-6">
            <div className="border-2 rounded-xl p-4" style={{ borderColor: data.themeColor }}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                filterDate={isDayAvailable}
                placeholderText="Escolha uma data"
                inline
              />
            </div>
          </div>

          {selectedDate && (
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                Horários disponíveis em {selectedDate.toLocaleDateString()}:
              </h4>
              <div className="flex flex-wrap gap-3">
                {data.availableHours.map((hour, i) => (
                  <button
                    key={i}
                    className="px-4 py-2 rounded-lg font-medium text-white shadow transition hover:opacity-90"
                    style={{ backgroundColor: data.themeColor }}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}
