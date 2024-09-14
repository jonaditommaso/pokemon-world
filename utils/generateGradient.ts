export const generateGradient = (hexColor: string, orientation: string = 'top'): string => {
    const opacities: number[] = [1, 0.8, 0.6, 0.4, 0.2, 0];
    const gradientStops: string[] = [];

    opacities.forEach((opacity: number, index: number) => {
        const alphaHex: string = Math.round(opacity * 255).toString(16).padStart(2, '0');
        gradientStops.push(`${hexColor}${alphaHex}`);
    });

    return `linear-gradient(to ${orientation} left, ${gradientStops.join(', ')})`;
}