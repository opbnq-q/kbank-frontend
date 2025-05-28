import { defineStore } from 'pinia'
import type { I18nGetter } from '~/shared/types/i18n-getter.type'
import { registerApi } from '../api/register.api'
import { isEmail } from '~/shared/utils/is-email.util'
import { TokenManager } from '~/shared/lib/token-manager.lib'

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
        validateForm(t: I18nGetter) {
            this.errors = {
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: ''
            }

            if (!this.email) {
                this.errors.email = t('register.email') + ' ' + t('register.errors.invalidEmail')
            } else if (!isEmail(this.email)) {
                this.errors.email = t('register.errors.invalidEmail')
            } else if (this.email.length < 4 || this.email.length > 100) {
                this.errors.email = t('register.errors.invalidEmail')
            }

            if (!this.firstName) {
                this.errors.firstName = t('register.errors.invalidFirstName')
            } else if (typeof this.firstName !== 'string' || this.firstName.length < 5 || this.firstName.length > 30) {
                this.errors.firstName = t('register.errors.invalidFirstName')
            }

            if (!this.lastName) {
                this.errors.lastName = t('register.errors.invalidLastName')
            } else if (typeof this.lastName !== 'string' || this.lastName.length < 5 || this.lastName.length > 30) {
                this.errors.lastName = t('register.errors.invalidLastName')
            }

            if (!this.password) {
                this.errors.password = t('register.errors.invalidPassword')
            } else if (typeof this.password !== 'string' || this.password.length < 8 || this.password.length > 16) {
                this.errors.password = t('register.errors.invalidPassword')
            }

            if (!this.confirmPassword) {
                this.errors.confirmPassword = t('register.errors.passwordMismatch')
            } else if (this.confirmPassword !== this.password) {
                this.errors.confirmPassword = t('register.errors.passwordMismatch')
            }
        },
        async submit(t: I18nGetter) {
            this.validateForm(t)
            if (Object.values(this.errors).some(v => !!v)) return;
            const result = await registerApi({
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                password: this.password
            })
            if (!result) return;
            if (result.status == 'success') {
                await TokenManager.set(result.data)
                return navigateTo('/')
            }
        }
    }
})
