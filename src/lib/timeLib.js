export function TimeAgo(date) {

    const now = new Date();
    const secondsPast = Math.floor((now - date) / 1000);

    const rtf = new Intl.RelativeTimeFormat('no', { numeric: 'auto' });

    if (secondsPast < 60) { // seconds in 1 minute
        return rtf.format(-secondsPast, 'second');
    } else if (secondsPast < 3600) { // seconds in 1 hour
        const minutesPast = Math.floor(secondsPast / 60);
        return rtf.format(-minutesPast, 'minute');
    } else if (secondsPast < 86400) { // seconds in 1 day
        const hoursPast = Math.floor(secondsPast / 3600);
        return rtf.format(-hoursPast, 'hour');
    } else if (secondsPast < 2592000) { // seconds in 30 days
        const daysPast = Math.floor(secondsPast / 86400);
        return rtf.format(-daysPast, 'day');
    } else if (secondsPast < 31557600) { // seconds in a year
        const daysPast = Math.floor(secondsPast / 2592000);
        return rtf.format(-daysPast, 'month');
    } else {
        const daysPast = Math.floor(secondsPast / 2592000);
        return rtf.format(-daysPast, 'year');
    }

    return null
}

export function formatDate(date) {
    const months = [
      "Januar", "Februar", "Mars", "April", "Mai", 
      "Juni", "Juli", "August", "September", "Oktober", 
      "November", "Desember"
    ];

    if (date === undefined || date == null) {
        return ""
    }
    
    // Hent dag, månedsindeks, og år fra datoobjektet
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    const currentYear = new Date().getFullYear();

    // Returner formatert dato

    if (year !== currentYear) {
        return `${day}. ${months[monthIndex]} ${year}`;
    }
    else {
        return `${day}. ${months[monthIndex]}`;
    }
  }
  
export function formatRelativeDate (date) {
    const now = new Date();
    const secondsPast = Math.floor((now - date) / 1000);
    if (secondsPast > 86400) {
        return formatDate(date)
    } else {
        return TimeAgo(date)
    }
}