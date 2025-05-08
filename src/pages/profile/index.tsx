import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { findUserByToken } from '@/services/user';
import { findEntrepreneursByTag } from '@/services/enterpreuneurs';  

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Entrepreneur[]>([]);
    const router = useRouter(); 

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const res = await findUserByToken(token);
                setUser(res);
            } catch (error) {
                router.push('/login');
            }
        };

        fetchUser();
    }, []);

    const handleSearch = async (text: string) => {
        setQuery(text);
        if (!text) return setResults([]);
        const token = localStorage.getItem('token');
        const data = await findEntrepreneursByTag(text, token!);
        setResults(data.length ? data : []);
    };

    if (!user) return <div className="p-4 text-center text-gray-600">Carregando...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 relative">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Meu Perfil</h1>

            {/* BUSCA */}
            <div className="mb-8"> 
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Buscar por @slug"
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {results.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl shadow-lg mt-2 max-h-60 overflow-y-auto">
                            {results.map((r) => (
                                <li
                                    key={r.slug}
                                    className="px-4 py-2 hover:bg-blue-50 text-gray-800 cursor-pointer"
                                    onClick={() => router.push(`/empresa/${r.slug}`)}
                                >
                                    @{r.slug}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* INFO DO USUÁRIO */}
            <div className="bg-blue-50 border border-blue-400 rounded-2xl shadow-md p-6 mb-8">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Informações Pessoais</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
        <p><span className="font-medium">Nome:</span> {user.name}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Tipo:</span> {user.role}</p>
        <p><span className="font-medium">Criado em:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
</div>


            {/* AGENDAMENTOS */}
            <div>
    <h2 className="text-xl font-semibold mb-4 text-gray-700">Meus Agendamentos</h2>
    {user.appointmentsAsClient?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {user.appointmentsAsClient.map((appt) => (
                <div
                    key={appt.id}
                    className="group bg-white border border-blue-400 rounded-xl shadow-sm p-4 h-44 overflow-y-auto transition-colors duration-300 hover:bg-blue-100"
                >
                    <div className="group-hover:pointer-events-none">
                        <p className="text-sm text-gray-800 mb-1"><strong>Empresário:</strong> ID {appt.entrepreneurId}</p>
                        <p className="text-sm text-gray-800 mb-1"><strong>Data:</strong> {new Date(appt.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-800 mb-1"><strong>Hora:</strong> {appt.time}</p>
                        <p className="text-sm text-gray-800 mb-1"><strong>Notas:</strong> {appt.notes}</p>
                        <p className="text-sm text-gray-800"><strong>Status:</strong> {appt.status}</p>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <p className="text-gray-500">Nenhum agendamento encontrado.</p>
    )}
</div>
        </div>
    );
}
