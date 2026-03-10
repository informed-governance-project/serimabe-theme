$(document).ready(function () {
  const checkboxes = $(".company-select-checkbox");
  const generateButton = $("#generateButton");
  const checkboxesDisabled = checkboxes.filter(':disabled');
  const checkAllInput = $("#select_all_companies");
  const companyTableForm = $("#companyTableForm");

  // Dashboard columns sort management
  sort_field_from_context = $('#sort_field_reporting_table').text() ? JSON.parse($('#sort_field_reporting_table').text()) : null,
  sort_direction_from_context = $('#sort_direction_reporting_table').text() ? JSON.parse($('#sort_direction_reporting_table').text()) : "desc",

  initSortableHeaders(
    {
      sortField: sort_field_from_context,
      sortDirection: sort_direction_from_context,
    }
  );

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

  // Dashboard columns visibility management
  const $tableDashboard = $('#reporting-table');
  $(document).on('show.bs.modal', '#ReportinghideColumns', function () {
    initColumnsChoice($tableDashboard);
  });
  $(document).on('change', '.column-toggle', function () {
    changeColumnVisibility($tableDashboard, this);
  });
  loadColumnDashboardState($tableDashboard);

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
      const csrftoken = getCsrftoken();
      let formdata = companyTableForm.serialize();
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
