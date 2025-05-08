interface Appointment {
    id: string;
    entrepreneurId: string;
    date: string;
    time: string;
    notes: string;
    status: string;
}

interface User {
    name: string;
    email: string;
    role: string;
    createdAt: string;
    appointmentsAsClient?: Appointment[];
}
 

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