export const capitalize = (txt: string) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
}

export const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    const parts = new Intl.DateTimeFormat('es-ES', options).formatToParts(date);

    const day = parts.find(p => p.type === 'day')?.value ?? '';
    const month = capitalize(parts.find(p => p.type === 'month')?.value ?? '');
    const year = parts.find(p => p.type === 'year')?.value ?? '';

    return `${day} ${month} ${year}`;
}