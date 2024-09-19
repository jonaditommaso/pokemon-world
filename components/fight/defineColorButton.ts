export const defineSkillColorButton = (i: number) => {
    const colorMap: { [key: number]: 'success' | 'primary' | 'warning' | 'error' } = {
        0: 'success',
        1: 'primary',
        2: 'warning',
        3: 'error',
    };
    return colorMap[i];
}