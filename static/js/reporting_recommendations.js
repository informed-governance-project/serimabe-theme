$(document).ready(function () {
    let table = $('#reporting-recommendations-table').DataTable({
        dom: 'rt<"table_controls mt-3 bottom d-flex justify-content-between lh-1 small"lip><"clear">',
        autoWidth: false,
        paging: true,
        searching: false,
        order: [[0, 'asc']],
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
        if (rowCount <= 10) $('.table_controls').addClass("d-none");
    }

    $(document).on("click", ".delete_report_recommendation", function () {
        let $this = $(this);
        let modalDeleteButton = $("#modal-delete-report-recommendation-button");
        let deleteUrlBase = $this.data('delete-url');
        modalDeleteButton.attr('href', deleteUrlBase);
      });

});
