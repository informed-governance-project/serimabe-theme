$.fn.dataTable.ext.order['dom-checkbox'] = function (settings, col) {
    return this.api().column(col, { order: 'index' }).nodes().map(function (td, i) {
        return $('input[type="checkbox"]', td).prop('checked') ? 1 : 0;
    });
};

$(document).ready(function () {
    const checkboxes = $(".company-select-checkbox");
    const generateButton = $("#generateButton");
    const checkboxesDisabled = checkboxes.filter(':disabled');
    const checkAllInput = $("#select_all_companies");
    const companyTableForm = $("#companyTableForm");

    let table = $('#reporting-table').DataTable({
        autoWidth: false,
        paging: false,
        searching: false,
        info: false,
        order: [],
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
            {
                targets: 4,
                orderable: true,
                orderDataType: 'dom-checkbox',
                type: 'html'
            },
            {
                targets: 5,
                orderable: true,
                orderDataType: 'dom-checkbox',
                type: 'html'
            },
            {
                targets: 6,
                orderable: true,
                type: 'num'
            },
            {
                targets: 7,
                orderable: false,
                type: 'html'
            },
        ],
    });

    $(document).on("click", '.reporting_access_log', function () {
        var $popup = $("#reporting_access_log");
        var popup_url = `access_log/${$(this).data("company-id")}/${$(this).data("sector-id")}/${$(this).data("year")}`;

        $(".modal-dialog", $popup).load(popup_url, function () {
            $popup.modal("show");
        });
    });

    $(document).on("click", '.review_comment_report', function () {
        var $popup = $("#review_comment_report");
        var popup_url = `review_comment_report/${$(this).data("company-id")}/${$(this).data("sector-id")}/${$(this).data("year")}`;

        $(".modal-dialog", $popup).load(popup_url, function () {
            $popup.modal("show");
        });
    });

    $("#openFilter").on("click", function () {
        $("#filterModal").modal("show");
    })

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
    } else {
        generateButton.prop("disabled", true);
    }

    if (checkboxesDisabled.length === checkboxes.length) {
        checkAllInput.prop('disabled', true);
    }

    updateCheckAll();


    generateButton.on('click', function () {
        if (companyTableForm.length) {
            paginationParams = table.page.info();
            table.page.len(-1).draw();
            const csrftoken = getCookie('csrftoken');
            let formdata = companyTableForm.serialize();
            table.page.len(paginationParams.length).draw();
            load_spinner();

            fetch("/reporting/", {
                method: "POST",
                headers: {
                    "X-CSRFToken": csrftoken,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formdata,
            })
            .then(response => {
                if (!response.ok) {
                    stop_spinner();
        
                    return response.json().then(data => {
                        if (data.messages) {
                            const messagesContainer = $("#messages-container");
                            if (messagesContainer.length) {
                                messagesContainer.html(data.messages);
                            }
                            throw new Error(response.statusText);
                        }
                    });
                }
                stop_spinner()
                return response.json().then(data => {
                    if (data.messages) {
                        const messagesContainer = $("#messages-container");
                        if (messagesContainer.length) {
                            messagesContainer.html(data.messages);
                        }
                    }
                });
            })
            .catch(error => {
                stop_spinner()
                console.error("Error:", error);
            });

        }
    });
});
