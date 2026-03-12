$(document).ready(function () {
  $(document).on("click", ".delete_report_project", function () {
    let $this = $(this);
    let modalDeleteForm = $("#modal-delete-report-form");
    let deleteUrlBase = $this.data('delete-url');
    let projectId = $this.data('project-id');
    let deleteUrl = deleteUrlBase.replace('0', projectId);
    modalDeleteForm.attr('action', deleteUrl);
  });
  const generateButton = $("#generateButton");
  const downloadButton = $("#download_reports")

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




  let pollTimer = null;

  function startPolling(projectId) {
    stopPolling();
    pollTimer = setInterval(function () {
      $.get(`project/${projectId}/report/status`, function (data) {
        updateUI(data)
        if (isTerminalState(data.status)) {
          stopPolling();
        }
      }).fail(function () {
        console.warn("Error");
      });
    }, 1500);
  }

  function stopPolling() {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  }

  function updateUI(data) {
    downloadButton.removeClass("btn-primary btn-running btn-stop");
    downloadButton.removeAttr("disabled")
    downloadButton.empty()
    switch (data.status) {
      case "FAIL":
      case "ABORT":
      case "DONE":
        const $icon = $('<i>', { class: "ms-2 bi bi-download" })
        const $text_done = $('<span>', { text: "Download" })
        downloadButton.off("mouseenter.running mouseleave.running click.running")
        downloadButton.addClass("btn-primary")
        downloadButton.append($text_done).append($icon)
        break;

      case "RUNNING":
        const $spinner = $('<div>', { class: "spinner-border spinner-border-sm", role: "status" })
        const $text_running = $('<span>', { class: "ms-2", text: "Generating report" })

        downloadButton.addClass("btn-running ")
        downloadButton.append($spinner).append($text_running)

        downloadButton.on("mouseenter.running", function () {
          downloadButton.empty()
          downloadButton.removeClass("btn-running").addClass("btn-stop")
          downloadButton.append($('<i>', { class: "bi bi-sign-stop-fill" }))
          downloadButton.append($('<span>', { class: "ms-2", text: "Stop generating" }))
        })

        downloadButton.on("mouseleave.running", function () {
          downloadButton.empty()
          downloadButton.removeClass("btn-stop").addClass("btn-running")
          downloadButton.append($('<div>', { class: "spinner-border spinner-border-sm", role: "status" }))
          downloadButton.append($('<span>', { class: "ms-2", text: "Generating report" }))
        })

        downloadButton.on("click.running", function () {
          const csrftoken = getCsrftoken();
          $.ajax({
            url: `project/1/report/cancel`,
            method: "POST",
            headers: { "X-CSRFToken": csrftoken },
          })
        })

        if (downloadButton.is(":hover")) {
          downloadButton.trigger("mouseenter.running")
        }
    }
  }

  function isTerminalState(status) {
    return ["FAIL", "DONE", "ABORT"].includes(status);
  }

  generateButton.on('click', function () {
    const csrftoken = getCsrftoken();
    let formdata = {}
    load_spinner();
    updateUI({ status: "RUNNING" })

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
          startPolling(1);
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
  });
});
