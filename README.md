<p align="center">
  <img src="https://user-images.githubusercontent.com/placeholder/logo.svg" width="120" alt="Logo do Projeto" />
</p>

<h1 align="center">Frontend | Agendoou - White Label Scheduling App</h1>

<p align="center">
  Plataforma de agendamento white-label com autenticação, múltiplos empreendedores e integração com APIs. 
  Desenvolvida em Next.js + Tailwind CSS.
</p>

<p align="center">
  <a href="https://nextjs.org" target="_blank"><img src="https://img.shields.io/badge/Next.js-13-black?logo=nextdotjs" alt="Next.js" /></a>
  <a href="https://vercel.com" target="_blank"><img src="https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel" alt="Deploy Vercel" /></a>
  <a href="https://tailwindcss.com" target="_blank"><img src="https://img.shields.io/badge/Styled_with-TailwindCSS-38B2AC?logo=tailwindcss" alt="TailwindCSS" /></a>
</p>

---

## 📦 Tecnologias

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Date Picker](https://react-datepicker.com/) 
- [Axios](https://axios-http.com/)
- [Vercel](https://vercel.com/) (deploy)

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/EmmanuelStocco/Agendoou-Frontend.git
cd seu-repo-frontend
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn
```

### 3. Link com API

```env
No index de API, direcione para a rota correta - exemplo: http://localhost:3000
``` 

### 4. Rode o projeto

```bash
npm run dev
# ou
yarn dev
```

---

## 🔍 Scripts disponíveis

| Comando             | Ação                              |
|---------------------|-----------------------------------|
| `dev`               | Inicia o servidor de desenvolvimento |
| `build`             | Compila para produção             |
| `start`             | Inicia o app em modo produção     | 
---

## 🧪 Padronização

O projeto utiliza:

- ESLint + Prettier 
- Integrações API em `src/services`
- Tipagens em `src/interfaces`
- Páginas otimizada em `src/pages`
- Componentes re-aproveitados em `src/components` 

---

## 📦 Deploy (Vercel)

1. Faça login em [vercel.com](https://vercel.com)
2. Clique em **"New Project"**
3. Import seu repositório
4. Configure o ambiente `.env` no painel
5. Salve e aguarde o build

---

## ✨ Funcionalidades

- ✅ Cadastro de usuários
- ✅ Login de empreendedores e usuários comuns
- ✅ Páginas dinâmicas por `slug` do profissional ao esporadico
- ✅ Agendamento com datas e horários disponíveis do profissional escolhido
- ✅ Validações de formulário
- ✅ Estilização responsiva com Tailwind

---

## 📁 Estrutura de pastas (resumida)

```bash
src/
│
├── components/         # Componentes reutilizáveis da UI
├── context/            # Context API para estado global
├── hooks/              # Custom hooks React (ex: useAuth, useForm)
├── interfaces/         # Tipagens e contratos TypeScript
├── pages/              # Páginas do Next.js (rotas baseadas em arquivo)
│   └── scheduling/[slug].tsx
├── services/           # Axios, requisições HTTP e lógica de API
└── styles/             # Estilos globais e configurações do Tailwind
```

---

## 🛠️ Manutenção e contribuição

Pull requests são bem-vindas! Sinta-se à vontade para abrir issues ou melhorar algo que encontrou no código.

---

## 👨‍💻 Autor

Feito com 💻 por [Emmanuel Stocco](https://github.com/EmmanuelStocco)

## 🪪 Licença

Este projeto é licenciado sob a licença MIT. 
