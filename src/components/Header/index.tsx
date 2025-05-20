'use client';
import { useRouter } from 'next/router';

export function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token'); // ou o que você usar para autenticação
    router.push('/login'); // redireciona para a página de login
  };

  return (
    <header className="text-blue-600
     px-4 py-3 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Agenda App</h1>

      <button
        onClick={handleLogout}
        className="bg-white text-black-600 px-4 py-1 rounded hover:bg-gray-100 transition cursor-pointer"
      >
        Sair
      </button>
    </header>
  );
}
