export type ServerResponseTemplate<T = any> = {
    status: "error"
    message: string
} | {
    status: "success"
    data: T
}