export function countDuplicates(arr: string[]): { [key: string]: number } {
    const counts: { [key: string]: number } = {};

    arr.forEach((item) => {
      if (item in counts) {
        counts[item]++;
      } else {
        counts[item] = 1;
      }
    });

    const duplicates: { [key: string]: number } = {};

    Object.keys(counts).forEach((key) => {
      if (counts[key] > 1) {
        duplicates[key] = counts[key];
      }
    });

    return duplicates;
}