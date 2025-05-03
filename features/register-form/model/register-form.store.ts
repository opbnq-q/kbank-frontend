import { defineStore } from 'pinia'

export interface RegisterFormState {
    email: string
    firstName: string
    lastName: string
    password: string
    confirmPassword: string
    errors: {
        email: string
        firstName: string
        lastName: string
        password: string
        confirmPassword: string
    }
}

export const useRegisterFormStore = defineStore('register-form-store', {
    state: (): RegisterFormState => ({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        errors: {
            email: '',
            firstName: '',
            lastName: '',
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
                password: '',
                confirmPassword: ''
            }
            console.log('works')
            //TODO:create a validation logic
        }
    }
})