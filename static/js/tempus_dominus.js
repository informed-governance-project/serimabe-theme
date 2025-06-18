document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.input-group[data-td-target-input="nearest"]').forEach(function (groupEl) {
        const inputEl = groupEl.querySelector('.datetimepicker-input:not([disabled])');

        const maxDateAttr = inputEl?.getAttribute('data-max-date');
        const maxDate = maxDateAttr ? new Date(maxDateAttr) : undefined;

        new tempusDominus.TempusDominus(groupEl, {
            allowInputToggle:true,
            promptTimeOnDateChange: true,
            promptTimeOnDateChangeTransitionDelay: 50,
            localization: {
                hourCycle: 'h23',
                format: 'yyyy-MM-dd HH:mm',
            },
            restrictions: {
                maxDate: maxDate
            },
            display: {
                buttons: {
                    today: false,
                    clear: true,
                    close: true
                },
                icons: {
                    time: 'bi bi-clock',
                    date: 'bi bi-calendar',
                    up: 'bi bi-chevron-up',
                    down: 'bi bi-chevron-down',
                    previous: 'bi bi-chevron-left',
                    next: 'bi bi-chevron-right',
                    today: 'bi bi-calendar-check',
                    clear: 'bi bi-trash',
                    close: 'bi bi-x-lg'
                },
                keyboardNavigation: true,
            }
        });
    });
});