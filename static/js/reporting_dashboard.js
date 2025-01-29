$(document).ready(function () {
    const checkboxes = $(".company-select-checkbox");
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
            {
                targets: 4,
                orderable: true,
                type: 'html'
            },
            {
                targets: 5,
                orderable: true,
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

    displayPagination(table);

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
                    const contentDisposition = response.headers.get("Content-Disposition");
                    let filename = "report.pdf"; // default filename
                    if (contentDisposition && contentDisposition.includes("filename=")) {
                        filename = contentDisposition.split("filename=")[1].replace(/"/g, "");
                    }

                    return response.blob().then(blob => ({ blob, filename }));
                })
                .then(({ blob, filename }) => {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = filename;
                    link.click();
                    stop_spinner()
                })
                .catch(error => {
                    stop_spinner()
                    console.error("Error:", error);
                });

        }
    });
});
