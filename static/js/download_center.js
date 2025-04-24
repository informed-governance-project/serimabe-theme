$(document).ready(function () {
    let table = $('#download-center-table').DataTable({
        dom: 'rt<"table_controls mt-3 bottom d-flex justify-content-between lh-1 small"lip><"clear">',
        language: datatableTranslations,
        autoWidth: false,
        paging: true,
        searching: false,
        order: [[0, 'desc']],
        columnDefs: [
            {   
                targets: 0,
                orderable: true, 
                type: 'string-utf8' 
            },
            {   
                targets: 1,
                orderable: true, 
                type: 'string-utf8' 
            },
            {   
                targets: 2,
                orderable: false, 
            },
        ],
    });

    displayPagination(table);

    function displayPagination(table) {
        let rowCount = table.data().length;
        if (rowCount <= 10) $('#download-center-table').siblings('.table_controls').addClass("d-none");
    }
});
