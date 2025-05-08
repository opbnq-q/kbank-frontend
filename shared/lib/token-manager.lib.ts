export abstract class TokenManager {
    private static readonly key = "token"

    public static get(): string | Promise<string | undefined> | undefined {
        if (import.meta.client) {
            return sessionStorage.getItem(TokenManager.key) as string | undefined
        }
    }

    public static set(token: string): void | Promise<void> {
        if (import.meta.client) sessionStorage.setItem(TokenManager.key, token)
    }
}