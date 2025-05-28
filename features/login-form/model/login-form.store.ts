import { defineStore } from 'pinia'
import { isEmail } from '~/shared/utils/is-email.util'
import { loginApi } from '../api/login.api'
import { TokenManager } from '~/shared/lib/token-manager.lib'

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
        validateForm(t: I18nGetter) {
            this.errors = {
                email: '',
                password: '',
            }
            if (!this.email) {
                this.errors.email = t('register.email') + ' ' + t('register.errors.invalidEmail')
            } else if (!isEmail(this.email)) {
                this.errors.email = t('register.errors.invalidEmail')
            } else if (this.email.length < 4 || this.email.length > 100) {
                this.errors.email = t('register.errors.invalidEmail')
            }
            if (!this.password) {
                this.errors.password = t('register.errors.invalidPassword')
            } else if (typeof this.password !== 'string' || this.password.length < 8 || this.password.length > 16) {
                this.errors.password = t('register.errors.invalidPassword')
            }
        },
        async submit(t: I18nGetter) {
            this.validateForm(t)
            if (Object.values(this.errors).some(v => !!v)) return;
            const result = await loginApi({
                email: this.email,
                password: this.password
            })
            if (!result) return;
            if (result.status == 'success') {
                await TokenManager.set(result.data)
                navigateTo('/')
            }
        }
    }
})