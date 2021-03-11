export const removeFormatting = (str: string) => {
    return str.replaceAll('_', '').replaceAll('-', '').replaceAll('.', '');
}
