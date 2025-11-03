$(document).ready(function () {
  const $workflow = $('#id_workflow');
  $workflow.find('option[data-regulation]').hide();

  $('#id_regulation').on('change', function () {
    const selectedReg = $(this).val();
    $workflow.find('option').each(function () {
      const wfReg = $(this).data('regulation');
      if (!wfReg || wfReg == selectedReg) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
    $workflow.val('');
  });

  datePickers = [];
  document.querySelectorAll('.input-group[data-td-target-input="nearest"]').forEach(function (groupEl) {
    const inputEl = groupEl.querySelector('.datetimepicker-input:not([disabled])');
    const defaultTempusdOptions = {
      allowInputToggle: true,
      promptTimeOnDateChange: false,
      localization: {
        hourCycle: 'h23',
        format: 'yyyy-MM-dd',
      },
      display: {
        buttons: {
          today: false,
          clear: true,
          close: true
        },
        components: {
          calendar: true,
          date: true,
          month: true,
          year: true,
          decades: true,
          clock: false,
          hours: false,
          minutes: false,
          seconds: false,
          useTwentyfourHour: undefined
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
    };

    const maxDateAttr = inputEl?.getAttribute('data-max-date');
    const minDateAttr = inputEl?.getAttribute('data-min-date');
    const maxDate = maxDateAttr ? new Date(maxDateAttr) : undefined;
    const minDate = maxDateAttr ? new Date(minDateAttr) : undefined;
    const options = {
      ...defaultTempusdOptions,
      restrictions: {
        maxDate: maxDate,
        minDate: minDate
      }
    };
    datePickers.push(new tempusDominus.TempusDominus(groupEl, options));
  });

  const fromDateInputId = "id_from_date";
  const toDateInputId = "id_to_date";
  const fromPicker = datePickers.find(p => p.optionsStore.input.id === fromDateInputId);
  const toPicker = datePickers.find(p => p.optionsStore.input.id === toDateInputId);
  let isUpdating = false;

  if (toPicker && fromPicker) {
    $(`#${fromDateInputId}`).on("change", function (e) {
      if (isUpdating) return;
      isUpdating = true;
      const selectedFrom = e.detail.date;
      const currentTo = toPicker.dates.picked[0];

      toPicker.updateOptions({
        restrictions: { minDate: selectedFrom }
      });
      if (currentTo && currentTo < selectedFrom) {
        toPicker.dates.clear();
      }
      isUpdating = false;
    });

  }

  $(`#${toDateInputId}`).on("change", function (e) {
    if (isUpdating) return;
    isUpdating = true;
    const selectedTo = e.detail.date;
    const currentFrom = fromPicker.dates.picked[0];

    fromPicker.updateOptions({
      restrictions: { maxDate: selectedTo }
    });
    if (currentFrom && currentFrom > selectedTo) {
      fromPicker.dates.clear();
    }
    isUpdating = false;
  });



});




