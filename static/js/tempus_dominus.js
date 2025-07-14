document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.input-group[data-td-target-input="nearest"]').forEach(function (groupEl) {
        const inputEl = groupEl.querySelector('.datetimepicker-input:not([disabled])');

        const maxDateAttr = inputEl?.getAttribute('data-max-date');
        const maxDate = maxDateAttr ? new Date(maxDateAttr) : undefined;
        const options = {
            ...defaultTempusdOptions, // defined in base.js
            restrictions: {
                maxDate: maxDate
            }
        };
        new tempusDominus.TempusDominus(groupEl, options);
    });
});