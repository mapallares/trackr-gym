function Calendar(events = [], eventDate = 'date') {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const dayNames = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const eventDates = new Set(events.map(event => event[eventDate]));

    const daysInMonth = [];
    let dayOfWeek = firstDay.getDay();

    for (let i = 0; i < dayOfWeek; i++) {
        daysInMonth.push(`<td></td>`);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const currentDate = new Date(currentYear, currentMonth, day);
        const dateStr = currentDate.toISOString().split("T")[0];
        const isToday = currentDate.toDateString() === today.toDateString();
        const hasEvent = eventDates.has(dateStr);

        const cellClasses = [];
        if (isToday) cellClasses.push("tg-layout-calendar-today");
        if (hasEvent) cellClasses.push("tg-layout-calendar-event");

        daysInMonth.push(`
            <td class="tg-layout-calendar-day ${cellClasses.join(' ')}">
                ${day}
                ${hasEvent ? '<span class="tg-layout-calendar-event-indicator"></span>' : ""}
            </td>
        `);

        if ((dayOfWeek + 1) % 7 === 0) {
            daysInMonth.push("</tr><tr>");
        }

        dayOfWeek = (dayOfWeek + 1) % 7;
    }

    if (dayOfWeek !== 0) {
        for (let i = dayOfWeek; i < 7; i++) {
            daysInMonth.push(`<td></td>`);
        }
    }

    return `
        <div class="tg-layout-calendar-content">
            <strong class="tg-layout-calendar-month">${monthNames[currentMonth]} ${currentYear}</strong>
            <table class="tg-layout-calendar">
                <thead>
                    <tr>${dayNames.map(day => `<th>${day}</th>`).join('')}</tr>
                </thead>
                <tbody>
                    <tr>${daysInMonth.join('')}</tr>
                </tbody>
            </table>
        </div>
    `;

}

export default Calendar
