import { Result } from "@/types";

const storagePrefix = "checklister_";

const makeLocalStorage = <T>(prefix: string) => ({
    read: (): Result<T | null> => {
        try {
            const result = JSON.parse(window.localStorage.getItem(`${storagePrefix}${prefix}`) as string);

            return [result, false];
        } catch (error) {
            return [null, true];
        }
    },
    write: (value: T) => {
        window.localStorage.setItem(`${storagePrefix}${prefix}`, JSON.stringify(value));
    },
    clear: () => {
        window.localStorage.removeItem(`${storagePrefix}${prefix}`);
    },
});

export default makeLocalStorage;
