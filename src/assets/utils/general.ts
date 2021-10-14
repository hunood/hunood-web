import { KeyFromValue } from "typing/types";

export const invertEnum = <T extends Record<PropertyKey, PropertyKey>>(EnumType: T) => {
    type EnumInverse = { [V in T[keyof T]]: KeyFromValue<V, T> };

    const reducer = (obj: EnumInverse, key: PropertyKey) => {
        return ((obj as any)[(EnumType as T)[key as any]] = key, obj);
    };

    const object = Object.keys(EnumType as T).reduce(reducer, {} as EnumInverse);

    return object as { [V in T[keyof T]]: KeyFromValue<V, T> };
};