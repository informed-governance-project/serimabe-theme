$(document).ready(function () {
  let table = $('#securityobjectives-table').DataTable({
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
        type: 'date',
      },
      {
        targets: 1,
        orderable: true,
        type: 'date',
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
        type: 'string-utf8'
      },
      {
        targets: 5,
        orderable: true,
        type: 'num'
      },
      {
        targets: 6,
        orderable: true,
        type: 'num',
      },
      {
        targets: 7,
        orderable: true,
        type: 'string-utf8'
      },
      {
        targets: 8,
        orderable: false,
      },
    ]
  });

  displayPagination(table);

  $(document).on("click", ".delete_so_declaration", function () {
    let $this = $(this);
    let modalDeleteButton = $("#modal-delete-declaration-button");
    let deleteUrlBase = $this.data('delete-url');
    let standardAnswerId = $this.data('standard-answer-id');
    let deleteUrl = deleteUrlBase.replace('0', standardAnswerId);
    modalDeleteButton.attr('href', deleteUrl);
  });

  $(document).on("click", ".copy_so_declaration", function () {
    let $this = $(this);
    let standardAnswerId = $this.data('standard-answer-id');
    let $popup = $("#copy_so_declaration");
    let popup_url = `/securityobjectives/copy/${standardAnswerId}`;

    $(".modal-dialog", $popup).load(popup_url, function () {
      $popup.modal("show");
    });
  });

  $(document).on("click", ".review_comment_so_declaration", function () {
    let $this = $(this);
    let standardAnswerId = $this.data('standard-answer-id');
    let $popup = $("#review_comment_so_declaration");
    let popup_url = `/securityobjectives/review_comment/${standardAnswerId}`;
    $popup.find(".modal-dialog").empty();
    $(".modal-dialog", $popup).load(popup_url, function () {
      $popup.modal("show");
      $("#id_deadline").datepicker({
        showOptions: { direction: "up" },
        minDate: new Date(),
      });
    });

  });

  $(document).on("click", '.so_access_log', function () {
    var $popup = $("#so_access_log");
    var popup_url = 'access_log/' + $(this).data("standard-answer-id");

    $(".modal-dialog", $popup).load(popup_url, function () {
      $popup.modal("show");
    });
  });

  $(".download-link").on("click", function (e) {
    let $this = $(this);
    const csrftoken = getCookie('csrftoken');
    const standardAnswerId = $this.data('standard-answer-id');
    load_spinner();
    fetch(`download/${standardAnswerId}`, {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
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
  });

  $("#openFilter").on("click", function () {
    $("#filterModal").modal("show");
  })
})

function displayPagination(table) {
  let rowCount = table.data().length;
  if (rowCount <= 10) $('#securityobjectives-table').siblings('.table_controls').addClass("d-none");
}