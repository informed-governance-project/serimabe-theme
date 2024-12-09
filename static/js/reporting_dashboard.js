$(document).ready(function () {
    const checkboxes = $(".form-check-input:not(#select_all_companies)");
    const generateButton = $("#generateButton");
    const checkboxesDisabled = checkboxes.filter(':disabled');
    const checkAllInput = $("#select_all_companies");
    const companyTableForm = $("#companyTableForm");

    let table = $('#reporting-table').DataTable({
        dom: 'rt<"table_controls mt-3 bottom d-flex justify-content-between lh-1 small"lip><"clear">',
        autoWidth: false,
        paging: true,
        searching: false,
        order: [[2, 'asc']],
        columnDefs: [
            {   
                targets: 0,
                orderable: false,
            },
            {   
                targets: 1,
                orderable: false, 
                type: 'string-utf8' 
            },
            {   
                targets: 2,
                orderable: true, 
                type: 'string-utf8' 
            },
            {   
                targets: 3,
                orderable: true, 
                type: 'string-utf8' 
            },
        ],
    });

    displayPagination(table);


    function updateCheckAll() {
        checkAllInput.prop('checked', checkboxes.not(":disabled").length === checkboxes.not(":disabled").filter(":checked").length);
    }

    function processCheckboxSelection(checkbox) {
        generateButton.prop("disabled", !checkboxes.is(":checked"));
    }

    function displayPagination(table) {
        let rowCount = table.data().length;
        if (rowCount <= 10) $('.table_controls').addClass("d-none");
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
    } else {
        generateButton.prop("disabled", true);
    }

    if (checkboxesDisabled.length === checkboxes.length) {
        checkAllInput.prop('disabled', true);
    }

    generateButton.on('click', function () {
        if (companyTableForm.length) {
            companyTableForm[0].submit();
        }
    });
});
