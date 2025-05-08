import { useState } from 'react'
import { useRouter } from 'next/router'
import { login } from '@/services'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('') 
    try { 
        const data = await login(email, password) 
        localStorage.setItem('token', data.access_token) //salvar token
        router.push('/profile')
      } catch (error) {
        console.error('Erro no login:', error)
      } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Lembrar-me</label>
            </div>
            {/* <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">Esqueceu a senha?</a> */}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Ainda não tem uma conta?{' '}
            <button
              onClick={() => router.push('/signup')}
              className="text-indigo-600 hover:text-indigo-800 cursor-pointer underline"
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
