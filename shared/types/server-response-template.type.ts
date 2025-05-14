export type ServerResponseTemplate<T = unknown> = {
    status: "error"
    message: string
} | {
    status: "success"
    data: T
}