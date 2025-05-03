import { defineStore } from 'pinia'

export interface LoginFormState {
    email: string
    password: string
    errors: {
        email: string
        password: string
    }
}

export const useLoginFormStore = defineStore('login-form-store', {
    state: (): LoginFormState => ({
        email: '',
        password: '',
        errors: {
            email: '',
            password: '',
        }
    }),

    actions: {
        validateForm(t: (key: string) => string) {
            this.errors = {
                email: '',
                password: '',
            }
            console.log('works')
            //TODO:create a validation logic
        }
    }
})