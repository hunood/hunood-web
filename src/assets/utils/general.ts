import { KeyFromValue } from "typing/types";

export const invertEnum = <T extends Record<PropertyKey, PropertyKey>>(EnumType: T) => {
    type EnumInverse = { [V in T[keyof T]]: KeyFromValue<V, T> };

    const reducer = (obj: EnumInverse, key: PropertyKey) => {
        return ((obj as any)[(EnumType as T)[key as any]] = key, obj);
    };

    const object = Object.keys(EnumType as T).reduce(reducer, {} as EnumInverse);

    return object as { [V in T[keyof T]]: KeyFromValue<V, T> };
};

export const gerarDeCodigo = () => {
    return 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); // eslint-disable-line
        return v.toString(16);
    }).split("-").pop() as string;
};