class TokenManager {
    private static readonly key = "token"

    public get(): string | Promise<string | undefined> | undefined {
        if (import.meta.client) {
            return sessionStorage.getItem(TokenManager.key) as string | undefined
        }
    }

    public set(token: string): void | Promise<void> {
        if (import.meta.client) sessionStorage.setItem(TokenManager.key, token)
    }

    public remove(): void | Promise<void> {
        if (import.meta.client) sessionStorage.removeItem(TokenManager.key)
    }
}

export const useTokenManager = () => new TokenManager