$(document).ready(function () {
  let table = $('#securityobjectives-table').DataTable({
    autoWidth: false,
    paging: false,
    searching: false,
    info: false,
    order: [],
    columnDefs: [
      {
        targets: 0,
        orderable: true,
        type: 'string-utf8'
      },
      {
        targets: 1,
        orderable: true,
        type: 'date',
      },
      {
        targets: 2,
        orderable: true,
        type: 'date',
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
        type: 'string-utf8'
      },
      {
        targets: 6,
        orderable: true,
        type: 'num'
      },
      {
        targets: 7,
        orderable: true,
        type: 'num',
      },
      {
        targets: 8,
        orderable: false,
      },
    ]
  });

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
      groupEl = document.querySelector('.input-group[data-td-target-input="nearest"]')
      const options = {
        ...defaultTempusdOptions,
        restrictions: {
          minDate: new Date()
        }
      };
      new tempusDominus.TempusDominus(groupEl, options);
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

  const $search_bar_form = $("#search_bar_form")
  const $search_bar_input = $("#id_search")
  const $clearSearchBtn = $("#clearSearch")

  function toggleClearButton() {
    if ($search_bar_input.val() !== "") {
      $clearSearchBtn.removeClass("d-none");
    } else {
      $clearSearchBtn.addClass("d-none");
    }
  }

  $(document).on("input", $search_bar_input, toggleClearButton)

  $(document).on("click", "#clearSearch", function () {
    $search_bar_input.val("");
    toggleClearButton();
    $search_bar_form.trigger("submit");
  });

  $(document).on("submit", $search_bar_form, function () {
    load_spinner()
  });

  toggleClearButton();
})
