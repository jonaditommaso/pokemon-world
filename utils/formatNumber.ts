export const formatNumber = (num: number) => {
    const numStr = num.toString();

    if (numStr.length === 1) {
        return '00' + numStr;
    } else if (numStr.length === 2) {
        return '0' + numStr;
    } else {
        return numStr;
    }
}