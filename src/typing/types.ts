type KeyFromValue<V, T extends Record<PropertyKey, PropertyKey>> = {
    [K in keyof T]: V extends T[K] ? K : never
}[keyof T];

type Invert<T extends Record<PropertyKey, PropertyKey>> = {
    [V in T[keyof T]]: KeyFromValue<V, T>
};

type ErrorService = {
    message: string,
    status: number,
    error: boolean
};

export type { KeyFromValue, Invert, ErrorService };