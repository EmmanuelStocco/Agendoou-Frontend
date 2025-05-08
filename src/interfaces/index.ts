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

interface Entrepreneur {
    slug: string;
}
