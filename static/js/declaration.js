$(document).ready(function () {
    $('.selectpicker').selectpicker();

    $(".incident_detection_date").parent().on("dp.change", function (e) {
        if ($('.incident_starting_date').parent().data("DateTimePicker")) {
            $('.incident_starting_date').parent().data("DateTimePicker").clear();
            $('.incident_starting_date').parent().data("DateTimePicker").maxDate(e.date);
        }
    });

$('#wizard-next-btn').on('click', function(event) {
    const form = $(this).closest('form')[0];
    const lastStep = $(this).data('last-step');
    const currentStep = $(this).data('current-step');

    let firstInvalid = null;
    let allValid = true;

    $(form).find(':input').removeClass('is-invalid');

    for (const field of form.elements) {
        if (field.willValidate && !field.checkValidity()) {
            allValid = false;
            $(field).addClass('is-invalid');

            if (!firstInvalid) {
                firstInvalid = field;
            }
        }
    }

    if (!allValid) {
        firstInvalid.focus();
        firstInvalid.reportValidity();
        return;
    }

    if (lastStep === currentStep) {
        load_spinner();
    }
});

    let allTextarea = $('textarea');

    if (allTextarea.length > 0) {
        allTextarea.each(function () {
            if ($(this).prop('disabled')) $(this).attr('rows', '10');
        });

        allTextarea.on('focus', function () {
            if (!$(this).prop('disabled')) $(this).attr('rows', '10');
        });

        allTextarea.on('blur', function () {
            if (!$(this).prop('disabled')) $(this).attr('rows', '3');
        });
    }
});
