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

export const API_BASE_URL = 'http://localhost:3000'

export {
    login,
    registerUser,
    getEntrepreneurBySlug,
    registerEntrepreneur,
    findEntrepreneursByTag,
    findUserByToken,
    deleteAppointment
}




