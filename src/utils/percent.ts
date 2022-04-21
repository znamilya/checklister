export const calcPercentage = (value: number, total: number): number => {
    return Math.round((value / total) * 100);
};
