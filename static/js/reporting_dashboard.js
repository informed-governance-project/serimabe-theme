$(document).ready(function () {
    const checkboxes = $(".form-check-input:not(#select_all_companies)");
    const generateButton = $("#generateButton");
    const checkboxesDisabled = checkboxes.filter(':disabled');
    const checkAllInput = $("#select_all_companies");

    function updateCheckAll() {
        checkAllInput.prop('checked', checkboxes.not(":disabled").length === checkboxes.not(":disabled").filter(":checked").length);
    }

    function processCheckboxSelection(checkbox) {
        generateButton.prop("disabled", !checkboxes.is(":checked"));
    }

    checkboxes.on("change", function () {
        updateCheckAll();
        processCheckboxSelection($(this));
    });

    checkAllInput.on("change", function () {
        const isChecked = this.checked;
        checkboxes.not(":disabled").prop('checked', isChecked);
        generateButton.prop("disabled", !isChecked);
    });

    if (checkboxes.length > 0) {
        processCheckboxSelection(checkboxes.filter(':checked').first());
    }

    if (checkboxesDisabled.length === checkboxes.length) {
        checkAllInput.prop('disabled', true);
    }
});
