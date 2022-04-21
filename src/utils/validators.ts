export const minLength = (length: number, errorMessage: string) => (value: string) => {
    let valueLength;

    if (typeof value == "string") {
        valueLength = value.length;
    } else if (typeof value == "number") {
        valueLength = value;
    } else {
        throw new Error("minLength validator only accepts strings and numbers");
    }

    return valueLength >= length ? null : errorMessage;
};
