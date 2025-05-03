import { defineStore } from 'pinia'

export interface RegisterFormState {
    email: string
    firstName: string
    lastName: string
    birthday: string
    password: string
    confirmPassword: string
    errors: {
        email: string
        firstName: string
        lastName: string
        birthday: string
        password: string
        confirmPassword: string
    }
}

export const useRegisterFormStore = defineStore('register-form-store', {
    state: (): RegisterFormState => ({
        email: '',
        firstName: '',
        lastName: '',
        birthday: '',
        password: '',
        confirmPassword: '',
        errors: {
            email: '',
            firstName: '',
            lastName: '',
            birthday: '',
            password: '',
            confirmPassword: ''
        }
    }),

actions: {
   validateForm(t: (key: string) => string) {
            this.errors = {
                email: '',
                firstName: '',
                lastName: '',
                birthday: '',
                password: '',
                confirmPassword: ''
            }

            //TODO:create a validation logic
        }
    }
})