interface Appointment {
    id: string;
    entrepreneurId: string;
    date: string;
    time: string;
    notes: string;
    status: string;
    client?: {
        id: string;
        name: string;
        email: string;
    };
    entrepreneur: {
        id: string;
        businessName: string;
        slug: string;
    };
}

interface User {
    name: string;
    email: string;
    role: string;
    createdAt: string;
    appointmentsAsClient?: Appointment[];
    appointmentsAsEntrepreneur?: Appointment[];
    slug: string;
    id: string;
}
 

type Entrepreneur = {
  id: number
  businessName: string
  themeColor: string
  logoUrl: string
  description: string
  availableDays: string[]
  availableHours: string[]
  services: any[]
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