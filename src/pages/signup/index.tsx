import { useState } from 'react'
import { useRouter } from 'next/router'
import { registerEntrepreneur, registerUser } from '@/services'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isBusiness, setIsBusiness] = useState(false)
  const [businessName, setBusinessName] = useState('')
  const [themeColor, setThemeColor] = useState('#FF5733')
  const [logoUrl, setLogoUrl] = useState('')
  const [description, setDescription] = useState('')
  const [availableDays, setAvailableDays] = useState<any>([])
  const [availableHours, setAvailableHours] = useState<any>([])
  const [services, setServices] = useState([{ name: '', duration: 30, price: 0 }])
  const [error, setError] = useState('')

  const handleServiceChange = (index: number, field: string, value: any) => {
    const updatedServices: any = [...services]
    updatedServices[index][field] = value
    setServices(updatedServices)
  }

  const addService = () => {
    setServices([...services, { name: '', duration: 30, price: 0 }])
  }

  const toggleAvailableDay = (day: any) => {
    setAvailableDays((prev: any) =>
      prev.includes(day) ? prev.filter((d: any) => d !== day) : [...prev, day]
    )
  }

  const toggleAvailableHour = (hour: string) => {
    setAvailableHours((prev: any) =>
      prev.includes(hour) ? prev.filter((h: any) => h !== hour) : [...prev, hour]
    )
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
  
    try {
      const userData = await registerUser({
        name,
        email,
        password,
        role: isBusiness ? 'entrepreneur' : 'client',
      })
  
      if (isBusiness) {
        await registerEntrepreneur({
          userId: userData.id,
          businessName,
          themeColor,
          logoUrl,
          description,
          availableDays,
          availableHours,
          services,
        })
      }
  
      router.push('/login')
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Erro ao criar conta')
    }
  }

  const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const horas = ['09:00', '10:00', '11:00', '14:00', '15:00']

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Criar Conta</h2>
        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border p-2 rounded" />
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border p-2 rounded" />
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border p-2 rounded" />

          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={isBusiness} onChange={(e) => setIsBusiness(e.target.checked)} />
            <span>Perfil de Empresa</span>
          </label>

          {isBusiness && (
            <div className="space-y-4">
              <input type="text" placeholder="Nome da Empresa" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full border p-2 rounded" />
              <input type="text" placeholder="Cor do Tema (ex: #FF5733)" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="w-full border p-2 rounded" />
              <input type="text" placeholder="Logo URL" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="w-full border p-2 rounded" />
              <textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded" />

              <div>
                <p>Dias disponíveis:</p>
                <div className="flex flex-wrap gap-2">
                  {dias.map((day) => (
                    <label key={day} className="flex items-center gap-1">
                      <input type="checkbox" checked={availableDays.includes(day)} onChange={() => toggleAvailableDay(day)} />
                      {day}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p>Horários disponíveis:</p>
                <div className="flex flex-wrap gap-2">
                  {horas.map((hour) => (
                    <label key={hour} className="flex items-center gap-1">
                      <input type="checkbox" checked={availableHours.includes(hour)} onChange={() => toggleAvailableHour(hour)} />
                      {hour}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p>Serviços:</p>
                {services.map((service, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Nome"
                      value={service.name}
                      onChange={(e) => handleServiceChange(idx, 'name', e.target.value)}
                      className="flex-1 border p-1 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Duração"
                      value={service.duration}
                      onChange={(e) => handleServiceChange(idx, 'duration', +e.target.value)}
                      className="w-24 border p-1 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Preço"
                      value={service.price}
                      onChange={(e) => handleServiceChange(idx, 'price', +e.target.value)}
                      className="w-24 border p-1 rounded"
                    />
                  </div>
                ))}
                <button type="button" onClick={addService} className="text-sm text-indigo-600 hover:underline">+ Adicionar serviço</button>
              </div>
            </div>
          )}

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Cadastrar</button>
        </form>
        <div className="mt-4 text-center">
        {/* href="" */}
          <a  className="text-sm text-indigo-600 hover:underline">Já tem conta? Entrar</a>
        </div>
      </div>
    </div>
  )
}
