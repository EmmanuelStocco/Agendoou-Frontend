import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getEntrepreneurBySlug } from '@/services'
import { redirectNotLoggedToLogin } from '@/utils'
import {Header} from '@/components/Header'

export default function LojaPage() {
  const router = useRouter()
  const { slug } = router.query
  const [data, setData] = useState<Entrepreneur | null>(null)
  const [loading, setLoading] = useState(true)

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

  const handleScheduleClick = () => {
    redirectNotLoggedToLogin()
    router.push(`/scheduling/${slug}`)
  }

  if (loading) return <p className="text-center mt-10 text-gray-500">Carregando...</p>
  if (!data) return <p className="text-center mt-10 text-red-500">Empreendimento não encontrado.</p>

  return (
    <>
      <Header />
    
    <div className="min-h-screen bg-gray-50" style={{ borderTop: `6px solid ${data.themeColor}` }}>


      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 py-8 px-6 rounded-xl" style={{ backgroundColor: data.themeColor }}>
          <img src={data.logoUrl} alt={data.businessName} className="w-28 h-28 object-cover rounded-xl shadow-md" />
          <div className="text-white">
            <h1 className="text-4xl font-extrabold">{data.businessName}</h1>
            <p className="mt-2">{data.description}</p>
          </div>
        </div>

        {/* Services */}
        {/* <div className="bg-white rounded-2xl shadow p-6 mb-6 border-l-4" style={{ borderColor: data.themeColor }}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Serviços oferecidos</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {data.services.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div> */}

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
  {data.services.map((s, i) => (
    <div
      key={i}
      className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl shadow-sm bg-white"
    >
      <div className="mt-1 text-blue-500">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-800">{s.name}</h4>
        {/* Subinfo opcional:
        <p className="text-xs text-gray-500">R${s.price} – {s.duration}</p> */}
      </div>
    </div>
  ))}
</div>


        {/* Availability */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6 border-l-4" style={{ borderColor: data.themeColor }}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Disponibilidade</h2>
          {/* <p className="text-gray-700"><strong>Dias:</strong> {data.availableDays.join(', ')}</p> */}
          <p className="text-gray-700"><strong>Horários:</strong> {data.availableHours.join(', ')}</p>
        </div>

        {/* Agendamento */}
        <div className="bg-white rounded-2xl shadow p-6 border-l-4" style={{ borderColor: data.themeColor }}>
          <button
            onClick={handleScheduleClick}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 cursor-pointer"
          >
            Agendar Atendimento
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
