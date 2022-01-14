import { auth } from "../config";


export const signIn = async (email, password) => {
    const response = await auth.signInWithEmailAndPassword(email, password)
        if(response.user) {
            return { user : response.user }
        } else {
            return { error: 'Введите данные правильно'}
        }
}

export const createUser = async (email, password) => {
    const response = await auth.createUserWithEmailAndPassword(email, password)
    console.log(response)
}

