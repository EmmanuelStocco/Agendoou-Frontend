import { login } from './login';
import { 
    getEntrepreneurBySlug,
    registerEntrepreneur,
    findEntrepreneursByTag
} from './enterpreuneurs';
import { 
    registerUser,
    findUserByToken
} from './user';
import {  
    deleteAppointment
} from './appointments';

// export const API_BASE_URL = 'http://localhost:3000' //local
export const API_BASE_URL = 'https://agendoou-backend-1.onrender.com'

export {
    login,
    registerUser,
    getEntrepreneurBySlug,
    registerEntrepreneur,
    findEntrepreneursByTag,
    findUserByToken,
    deleteAppointment
}




