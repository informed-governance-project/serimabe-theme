$(document).ready(function () {
    $("#id_0-incident_detection_date").on("change.td", function () {
        const startingDateInputId = "id_0-incident_starting_date";
        const resolutionDateInputId = "id_0-incident_resolution_date";
        const detectionDate = new Date($(this).val());
        if ($(`#${startingDateInputId}`)) {
            let startingPicker = datePickers.find(p => p.optionsStore.input.id === startingDateInputId);           
            if (startingPicker) {                
                startingPicker.dates.clear();
                startingPicker.updateOptions({
                    restrictions: { maxDate: detectionDate }
                });
            };
        }
        if ($(`#${resolutionDateInputId}`)) {
            const resolutionPicker = datePickers.find(p => p.optionsStore.input.id === resolutionDateInputId);
            if (resolutionPicker) {
                resolutionPicker.dates.clear();
                resolutionPicker.updateOptions({
                    restrictions: { minDate: detectionDate }
                });
            };
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
        let $field = $(field);
        let $freeTextInput = $("#id_" + field.name + "_freetext_answer");
        let $radios = $("#id_" + field.name).find('input[type="radio"]');
        let $container = $radios.closest('.mb-3');

        if ($container.hasClass('required-field') && $freeTextInput.length) {
            if ($freeTextInput.val().trim() !== "") {
                $radios.prop("required", false).removeAttr("required");
                $freeTextInput.prop("required", false).removeAttr("required");
            } else if ($radios.is(":checked")) {
                $radios.prop("required", true).attr("required", "required");
                $freeTextInput.prop("required", false).removeAttr("required");
            } else {
                $radios.prop("required", true).attr("required", "required");
                $freeTextInput.prop("required", true).attr("required", "required");
            }
        }

        if (field.willValidate && !field.checkValidity()) {
            allValid = false;
            $field.addClass('is-invalid');

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
